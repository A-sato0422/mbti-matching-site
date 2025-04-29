/**
 * MBTI タイプのデータと相性診断ロジック
 */

// MBTIタイプのデータ
const mbtiTypes = {
  INTJ: {
    name: 'INTJ',
    japanese: '建築家',
    description: '独創的な戦略家。論理的で独立心が強く、高い基準を持っています。',
    traits: ['分析的', '独立的', '戦略的', '計画的', '完璧主義']
  },
  INTP: {
    name: 'INTP',
    japanese: '論理学者',
    description: '革新的な発明家。好奇心旺盛で理論的、新しいアイデアに興味を持ちます。',
    traits: ['論理的', '創造的', '好奇心旺盛', '客観的', '独創的']
  },
  ENTJ: {
    name: 'ENTJ',
    japanese: '指揮官',
    description: 'カリスマ的なリーダー。効率と結果を重視し、大きな目標に向かって進みます。',
    traits: ['決断力がある', '効率的', '自信がある', '論理的', 'リーダーシップがある']
  },
  ENTP: {
    name: 'ENTP',
    japanese: '討論者',
    description: '機知に富んだ革新者。好奇心旺盛で議論好き、新しい可能性を探ります。',
    traits: ['革新的', '論争好き', '活発', '機知に富む', '適応力がある']
  },
  INFJ: {
    name: 'INFJ',
    japanese: '提唱者',
    description: '静かな理想主義者。深い洞察力と創造性を持ち、他者に献身的です。',
    traits: ['理想主義', '思いやりがある', '洞察力がある', '献身的', '創造的']
  },
  INFP: {
    name: 'INFP',
    japanese: '仲介者',
    description: '情熱的な理想主義者。強い価値観を持ち、自分らしさを大切にします。',
    traits: ['理想主義', '思いやりがある', '適応力がある', '忠実', '創造的']
  },
  ENFJ: {
    name: 'ENFJ',
    japanese: '主人公',
    description: 'カリスマ的な指導者。情熱的で責任感があり、他者の成長を促します。',
    traits: ['カリスマ的', '思いやりがある', '信頼性がある', '利他的', '強い責任感']
  },
  ENFP: {
    name: 'ENFP',
    japanese: '広報活動家',
    description: '熱狂的な創造者。情熱的で想像力豊かな社交家です。',
    traits: ['熱心', '創造的', '社交的', '楽観的', '適応力がある']
  },
  ISTJ: {
    name: 'ISTJ',
    japanese: '管理者',
    description: '実践的な責任感の強い人。事実と詳細を重視し、信頼性があります。',
    traits: ['組織的', '信頼性がある', '実用的', '論理的', '注意深い']
  },
  ISFJ: {
    name: 'ISFJ',
    japanese: '擁護者',
    description: '献身的な保護者。思いやりがあり、細部に気を配り、忠実です。',
    traits: ['献身的', '思いやりがある', '信頼性がある', '忍耐強い', '実用的']
  },
  ESTJ: {
    name: 'ESTJ',
    japanese: '幹部',
    description: '管理者タイプ。伝統的な価値観と秩序を重んじる実践的な人です。',
    traits: ['組織的', '実用的', '直接的', '信頼性がある', '伝統を重んじる']
  },
  ESFJ: {
    name: 'ESFJ',
    japanese: '領事',
    description: '思いやりのある社交家。協力的で忠実、調和を大切にします。',
    traits: ['思いやりがある', '協力的', '社交的', '忠実', '実用的']
  },
  ISTP: {
    name: 'ISTP',
    japanese: '巨匠',
    description: '大胆な実験者。冷静で柔軟性があり、問題解決に長けています。',
    traits: ['冷静', '柔軟', '実用的', '論理的', '独立的']
  },
  ISFP: {
    name: 'ISFP',
    japanese: '冒険家',
    description: '柔軟で魅力的なアーティスト。自由を愛し、自分の道を歩みます。',
    traits: ['芸術的', '冒険的', '敏感', '優しい', '自由を愛する']
  },
  ESTP: {
    name: 'ESTP',
    japanese: '起業家',
    description: 'エネルギッシュな行動家。実用的で機転が利き、冒険を楽しみます。',
    traits: ['エネルギッシュ', '冒険的', '適応力がある', '実用的', '現実的']
  },
  ESFP: {
    name: 'ESFP',
    japanese: 'エンターテイナー',
    description: '自発的で活気のあるパフォーマー。人生を楽しみ、人々を喜ばせます。',
    traits: ['熱心', '社交的', '楽観的', '実用的', '冒険的']
  }
};

// 相性スコアの計算マトリックス (100点満点)
const compatibilityMatrix = {
  // NT群 (INTJ, INTP, ENTJ, ENTP)
  INTJ: {
    INTJ: 75, INTP: 85, ENTJ: 80, ENTP: 75,
    INFJ: 90, INFP: 70, ENFJ: 65, ENFP: 75,
    ISTJ: 60, ISFJ: 50, ESTJ: 65, ESFJ: 40,
    ISTP: 65, ISFP: 55, ESTP: 45, ESFP: 40
  },
  INTP: {
    INTJ: 85, INTP: 70, ENTJ: 75, ENTP: 85,
    INFJ: 70, INFP: 80, ENFJ: 60, ENFP: 85,
    ISTJ: 55, ISFJ: 45, ESTJ: 50, ESFJ: 40,
    ISTP: 80, ISFP: 60, ESTP: 65, ESFP: 50
  },
  ENTJ: {
    INTJ: 80, INTP: 75, ENTJ: 70, ENTP: 75,
    INFJ: 75, INFP: 60, ENFJ: 70, ENFP: 65,
    ISTJ: 75, ISFJ: 50, ESTJ: 80, ESFJ: 60,
    ISTP: 60, ISFP: 40, ESTP: 70, ESFP: 55
  },
  ENTP: {
    INTJ: 75, INTP: 85, ENTJ: 75, ENTP: 70,
    INFJ: 65, INFP: 70, ENFJ: 65, ENFP: 80,
    ISTJ: 50, ISFJ: 40, ESTJ: 55, ESFJ: 45,
    ISTP: 70, ISFP: 55, ESTP: 80, ESFP: 65
  },
  
  // NF群 (INFJ, INFP, ENFJ, ENFP)
  INFJ: {
    INTJ: 90, INTP: 70, ENTJ: 75, ENTP: 65,
    INFJ: 75, INFP: 80, ENFJ: 85, ENFP: 75,
    ISTJ: 55, ISFJ: 65, ESTJ: 45, ESFJ: 60,
    ISTP: 45, ISFP: 60, ESTP: 40, ESFP: 50
  },
  INFP: {
    INTJ: 70, INTP: 80, ENTJ: 60, ENTP: 70,
    INFJ: 80, INFP: 70, ENFJ: 75, ENFP: 85,
    ISTJ: 45, ISFJ: 60, ESTJ: 35, ESFJ: 55,
    ISTP: 50, ISFP: 70, ESTP: 40, ESFP: 55
  },
  ENFJ: {
    INTJ: 65, INTP: 60, ENTJ: 70, ENTP: 65,
    INFJ: 85, INFP: 75, ENFJ: 70, ENFP: 80,
    ISTJ: 60, ISFJ: 70, ESTJ: 65, ESFJ: 75,
    ISTP: 45, ISFP: 60, ESTP: 50, ESFP: 65
  },
  ENFP: {
    INTJ: 75, INTP: 85, ENTJ: 65, ENTP: 80,
    INFJ: 75, INFP: 85, ENFJ: 80, ENFP: 70,
    ISTJ: 40, ISFJ: 50, ESTJ: 45, ESFJ: 60,
    ISTP: 50, ISFP: 65, ESTP: 60, ESFP: 70
  },
  
  // SJ群 (ISTJ, ISFJ, ESTJ, ESFJ)
  ISTJ: {
    INTJ: 60, INTP: 55, ENTJ: 75, ENTP: 50,
    INFJ: 55, INFP: 45, ENFJ: 60, ENFP: 40,
    ISTJ: 70, ISFJ: 75, ESTJ: 80, ESFJ: 70,
    ISTP: 65, ISFP: 55, ESTP: 60, ESFP: 50
  },
  ISFJ: {
    INTJ: 50, INTP: 45, ENTJ: 50, ENTP: 40,
    INFJ: 65, INFP: 60, ENFJ: 70, ENFP: 50,
    ISTJ: 75, ISFJ: 70, ESTJ: 65, ESFJ: 85,
    ISTP: 55, ISFP: 70, ESTP: 45, ESFP: 60
  },
  ESTJ: {
    INTJ: 65, INTP: 50, ENTJ: 80, ENTP: 55,
    INFJ: 45, INFP: 35, ENFJ: 65, ENFP: 45,
    ISTJ: 80, ISFJ: 65, ESTJ: 70, ESFJ: 75,
    ISTP: 60, ISFP: 40, ESTP: 70, ESFP: 60
  },
  ESFJ: {
    INTJ: 40, INTP: 40, ENTJ: 60, ENTP: 45,
    INFJ: 60, INFP: 55, ENFJ: 75, ENFP: 60,
    ISTJ: 70, ISFJ: 85, ESTJ: 75, ESFJ: 70,
    ISTP: 45, ISFP: 55, ESTP: 60, ESFP: 75
  },
  
  // SP群 (ISTP, ISFP, ESTP, ESFP)
  ISTP: {
    INTJ: 65, INTP: 80, ENTJ: 60, ENTP: 70,
    INFJ: 45, INFP: 50, ENFJ: 45, ENFP: 50,
    ISTJ: 65, ISFJ: 55, ESTJ: 60, ESFJ: 45,
    ISTP: 70, ISFP: 75, ESTP: 80, ESFP: 65
  },
  ISFP: {
    INTJ: 55, INTP: 60, ENTJ: 40, ENTP: 55,
    INFJ: 60, INFP: 70, ENFJ: 60, ENFP: 65,
    ISTJ: 55, ISFJ: 70, ESTJ: 40, ESFJ: 55,
    ISTP: 75, ISFP: 70, ESTP: 65, ESFP: 80
  },
  ESTP: {
    INTJ: 45, INTP: 65, ENTJ: 70, ENTP: 80,
    INFJ: 40, INFP: 40, ENFJ: 50, ENFP: 60,
    ISTJ: 60, ISFJ: 45, ESTJ: 70, ESFJ: 60,
    ISTP: 80, ISFP: 65, ESTP: 75, ESFP: 85
  },
  ESFP: {
    INTJ: 40, INTP: 50, ENTJ: 55, ENTP: 65,
    INFJ: 50, INFP: 55, ENFJ: 65, ENFP: 70,
    ISTJ: 50, ISFJ: 60, ESTJ: 60, ESFJ: 75,
    ISTP: 65, ISFP: 80, ESTP: 85, ESFP: 75
  }
};

// 相性コメントのデータ
const compatibilityComments = {
  excellent: {
    title: '素晴らしい相性！',
    description: 'お互いを高め合える素晴らしい組み合わせです。自然と互いの強みを活かし、弱みを補い合うことができるでしょう。',
    advice: 'お互いの考え方の違いを尊重し、コミュニケーションを大切にすることで、より良い関係を築けるでしょう。'
  },
  good: {
    title: '良い相性',
    description: '基本的に良い相性で、互いに理解し合える部分が多いです。時には意見の相違もありますが、それがむしろ関係を豊かにします。',
    advice: '意見が合わない時こそじっくり話し合い、互いの視点を理解する努力をすることが大切です。'
  },
  moderate: {
    title: 'まずまずの相性',
    description: '互いに魅力を感じる部分と、理解しにくい部分の両方があります。違いを認め合うことで、より良い関係を築くことが可能です。',
    advice: '相手のタイプの特徴をよく理解し、互いの強みと弱みを知っておくことで、コミュニケーションがスムーズになります。'
  },
  challenging: {
    title: 'やや難しい相性',
    description: '価値観や考え方に違いがあり、時に誤解が生じやすい組み合わせです。しかし、その違いを尊重することで、お互いに新しい視点を学ぶことができます。',
    advice: '相手と自分の考え方の違いを理解し、丁寧なコミュニケーションを心がけましょう。互いの違いを魅力に変えることができれば、素晴らしい関係になります。'
  },
  difficult: {
    title: '難しい相性',
    description: '基本的な価値観や考え方に大きな違いがあり、互いを理解するのに努力が必要な組み合わせです。しかし、その分成長の機会も多いでしょう。',
    advice: 'お互いの違いをまず受け入れることから始めましょう。無理に考え方を合わせようとせず、違いを尊重する姿勢が大切です。時間をかけてじっくり理解し合うことで、互いを補完する関係になる可能性があります。'
  }
};

/**
 * 二つのMBTIタイプの共通点を取得
 * @param {string} type1 - 最初のMBTIタイプ
 * @param {string} type2 - 二番目のMBTIタイプ
 * @returns {array} - 共通の特性の配列
 */
function getCommonTraits(type1, type2) {
  const traits1 = mbtiTypes[type1].traits;
  const traits2 = mbtiTypes[type2].traits;
  
  return traits1.filter(trait => traits2.includes(trait));
}

/**
 * 二つのMBTIタイプの相違点を取得
 * @param {string} type1 - 最初のMBTIタイプ
 * @param {string} type2 - 二番目のMBTIタイプ
 * @returns {array} - 相違のある特性の配列
 */
function getDifferentTraits(type1, type2) {
  const traits1 = mbtiTypes[type1].traits;
  const traits2 = mbtiTypes[type2].traits;
  
  // type1にあってtype2にない特性を3つまで取得
  const diff1 = traits1.filter(trait => !traits2.includes(trait)).slice(0, 3);
  
  return diff1;
}

/**
 * 相性スコアに基づいてコメントカテゴリを取得
 * @param {number} score - 相性スコア（0-100）
 * @returns {object} - 相性コメントのオブジェクト
 */
function getCompatibilityComment(score) {
  if (score >= 80) {
    return compatibilityComments.excellent;
  } else if (score >= 70) {
    return compatibilityComments.good;
  } else if (score >= 60) {
    return compatibilityComments.moderate;
  } else if (score >= 50) {
    return compatibilityComments.challenging;
  } else {
    return compatibilityComments.difficult;
  }
}

/**
 * 相性スコアを計算
 * @param {string} type1 - 最初のMBTIタイプ
 * @param {string} type2 - 二番目のMBTIタイプ
 * @returns {number} - 相性スコア（0-100）
 */
function calculateCompatibility(type1, type2) {
  if (!type1 || !type2 || !compatibilityMatrix[type1] || !compatibilityMatrix[type1][type2]) {
    return 0;
  }
  
  return compatibilityMatrix[type1][type2];
}

/**
 * 相性診断結果を取得
 * @param {string} type1 - 最初のMBTIタイプ
 * @param {string} type2 - 二番目のMBTIタイプ
 * @returns {object} - 診断結果のオブジェクト
 */
function getCompatibilityResult(type1, type2) {
  const score = calculateCompatibility(type1, type2);
  const comment = getCompatibilityComment(score);
  const commonTraits = getCommonTraits(type1, type2);
  const differentTraits = getDifferentTraits(type1, type2);
  
  return {
    type1: mbtiTypes[type1],
    type2: mbtiTypes[type2],
    score: score,
    title: comment.title,
    description: comment.description,
    advice: comment.advice,
    commonTraits: commonTraits,
    differentTraits: differentTraits
  };
}