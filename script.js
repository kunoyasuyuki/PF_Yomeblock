const target = document.getElementById('mitarashi') // アニメーションの対象
const startX = 50 // X座標の始点
const startY = 50 // Y座標の始点
const endX = 500 // X座標の目標点
const endY = 150 // Y座標の目標点
const diffX = endX - startX // X座標の変化量
const diffY = endY - startY // Y座標の変化量
const time = 1000 // 変化にかける時間 (ミリ秒)

// アップデートを実行する
requestAnimationFrame(update)

function update(timestamp) {
  // 進捗率を算出
  progress = timestamp / time

  // 進捗率が100%を超えないよう丸める
  progress = Math.min(progress, 1)

  // 値を算出し反映する
  const resultX = startX + diffX * progress // X座標
  const resultY = startY + diffY * progress // Y座標
  target.style.transform = `translate( ${resultX}px, ${resultY}px )`

  // 進捗が1未満の場合はアップデートを再実行する
  if (progress < 1) {
    requestAnimationFrame(update)
  }
}
