/**
 * アプリケーションのメインロジック
 */

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
  // MBTIタイプのオプションを追加
  populateMbtiOptions(userMbtiSelect);
  populateMbtiOptions(partnerMbtiSelect);
  
  // イベントリスナーを設定
  userMbtiSelect.addEventListener('change', function() {
    updateTypeDescription(this.value, userTypeDescription);
    toggleAnalyzeButton();
  });
  
  partnerMbtiSelect.addEventListener('change', function() {
    updateTypeDescription(this.value, partnerTypeDescription);
    toggleAnalyzeButton();
  });
  
  analyzeBtn.addEventListener('click', showResult);
  
  // アニメーション効果
  analyzeBtn.addEventListener('mouseover', function() {
    if (!this.disabled) {
      heart.style.transform = 'rotate(45deg) scale(1.1)';
    }
  });
  
  analyzeBtn.addEventListener('mouseout', function() {
    if (!this.disabled) {
      heart.style.transform = 'rotate(45deg) scale(1.05)';
    } else {
      heart.style.transform = 'rotate(45deg) scale(1)';
    }
  });
  
  // 初期状態では診断ボタンを無効に
  toggleAnalyzeButton();
});