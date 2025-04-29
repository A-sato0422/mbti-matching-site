// ページ読み込み完了時にアニメーションを開始
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.welcome-container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  // アニメーションのリセットと再開
  void container.offsetWidth;
  container.style.animation = 'fadeIn 1s ease forwards';
});