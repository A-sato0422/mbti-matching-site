/**
 * UI操作関連の機能
 */

// DOM要素の取得
const userMbtiSelect = document.getElementById('user-mbti');
const partnerMbtiSelect = document.getElementById('partner-mbti');
const userTypeDescription = document.getElementById('user-type-description');
const partnerTypeDescription = document.getElementById('partner-type-description');
const analyzeBtn = document.getElementById('analyze-btn');
const resultContainer = document.getElementById('result-container');
const compatibilityPercentage = document.getElementById('compatibility-percentage');
const compatibilityTitle = document.getElementById('compatibility-title');
const compatibilityDescription = document.getElementById('compatibility-description');
const commonTraitsList = document.getElementById('common-traits');
const differentTraitsList = document.getElementById('different-traits');
const adviceText = document.getElementById('advice-text');
const heart = document.querySelector('.heart');

/**
 * セレクトボックスにMBTIタイプのオプションを追加
 * @param {HTMLElement} selectElement - セレクトボックス要素
 */
function populateMbtiOptions(selectElement) {
  for (const type in mbtiTypes) {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = `${type} (${mbtiTypes[type].japanese})`;
    selectElement.appendChild(option);
  }
}

/**
 * タイプ説明を更新
 * @param {string} type - MBTIタイプ
 * @param {HTMLElement} descriptionElement - 説明を表示する要素
 */
function updateTypeDescription(type, descriptionElement) {
  if (type && mbtiTypes[type]) {
    const typeInfo = mbtiTypes[type];
    descriptionElement.innerHTML = `
      <h4>${typeInfo.name} (${typeInfo.japanese})</h4>
      <p>${typeInfo.description}</p>
      <div class="traits-container">
        ${typeInfo.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
      </div>
    `;
    
    // スタイルを追加
    const traitTags = descriptionElement.querySelectorAll('.trait-tag');
    traitTags.forEach(tag => {
      tag.style.display = 'inline-block';
      tag.style.background = 'var(--secondary-light)';
      tag.style.color = 'var(--secondary-dark)';
      tag.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
      tag.style.borderRadius = 'var(--border-radius-sm)';
      tag.style.margin = '0 var(--spacing-xs) var(--spacing-xs) 0';
      tag.style.fontSize = 'var(--font-size-xs)';
    });
  } else {
    descriptionElement.innerHTML = '<p>タイプを選択すると、特徴が表示されます</p>';
  }
}

/**
 * 診断ボタンの有効/無効を切り替え
 */
function toggleAnalyzeButton() {
  const userType = userMbtiSelect.value;
  const partnerType = partnerMbtiSelect.value;
  
  if (userType && partnerType) {
    analyzeBtn.disabled = false;
    
    // ハートをアクティブに
    heart.style.backgroundColor = 'var(--primary-color)';
    heart.style.transform = 'rotate(45deg) scale(1.05)';
    heart.querySelectorAll('::before, ::after').forEach(el => {
      el.style.backgroundColor = 'var(--primary-color)';
    });
  } else {
    analyzeBtn.disabled = true;
    
    // ハートを非アクティブに
    heart.style.backgroundColor = 'var(--primary-light)';
    heart.style.transform = 'rotate(45deg) scale(1)';
    heart.querySelectorAll('::before, ::after').forEach(el => {
      el.style.backgroundColor = 'var(--primary-light)';
    });
  }
}

/**
 * 診断結果を表示
 */
function showResult() {
  const userType = userMbtiSelect.value;
  const partnerType = partnerMbtiSelect.value;
  
  if (!userType || !partnerType) return;
  
  const result = getCompatibilityResult(userType, partnerType);
  
  // スコアの表示
  compatibilityPercentage.textContent = `${result.score}%`;
  
  // スコアに基づいて色を変更
  const scoreCircle = document.querySelector('.score-circle');
  if (result.score >= 80) {
    scoreCircle.style.backgroundColor = 'var(--success-color)';
    scoreCircle.style.color = 'var(--neutral-darkest)';
  } else if (result.score >= 60) {
    scoreCircle.style.backgroundColor = 'var(--accent-color)';
    scoreCircle.style.color = 'var(--neutral-darkest)';
  } else {
    scoreCircle.style.backgroundColor = 'var(--primary-color)';
    scoreCircle.style.color = 'white';
  }
  
  // タイトルと説明の更新
  compatibilityTitle.textContent = result.title;
  compatibilityDescription.textContent = result.description;
  
  // 共通点のリスト更新
  commonTraitsList.innerHTML = '';
  if (result.commonTraits.length > 0) {
    result.commonTraits.forEach(trait => {
      const li = document.createElement('li');
      li.textContent = trait;
      commonTraitsList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = '共通点はあまり見つかりません';
    commonTraitsList.appendChild(li);
  }
  
  // 相違点のリスト更新
  differentTraitsList.innerHTML = '';
  result.differentTraits.forEach(trait => {
    const li = document.createElement('li');
    li.textContent = trait;
    differentTraitsList.appendChild(li);
  });
  
  // アドバイスの更新
  adviceText.textContent = result.advice;
  
  // 結果コンテナを表示
  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth' });
  
  // ハートをアニメーション
  heart.style.backgroundColor = 'var(--primary-dark)';
  heart.style.transform = 'rotate(45deg) scale(1.2)';
  setTimeout(() => {
    heart.style.transform = 'rotate(45deg) scale(1.05)';
    heart.style.backgroundColor = 'var(--primary-color)';
  }, 500);
}