// 開始時のモーダル
const startDialog = document.getElementById('startModal')
const startButton = document.getElementById('start')
// 結果時のモーダル
const resultDialog = document.getElementById('resultModal')
const resultTitle = document.getElementById('resultModalLabel')
const resultBody = document.getElementById('resultBody')
const modalWrapper = document.getElementById('modal-wrapper')

const firstBlock = document.getElementById('blockAbove')
const secondBlock = document.getElementById('blockSecond')
const thirdBlock = document.getElementById('blockThird')
const fourthBlock = document.getElementById('blockFourth')

const fadeIn = document.getElementById('fade')

var count = 0
// おじさんを1秒後に1秒かけて座標(500, 150)へアニメーションさせる
//
/**
 * 対象オブジェクトをアニメーションして移動。
 * @param {string} targetID スクロール時間のミリ秒。
 * @param {number} time アニメーションさせる時間（ミリ秒）。
 * @param {number} endX X座標の目標値。
 * @param {number} endY Y座標の目標値。
 * @param {number} delay アニメーションを開始するまでの遅延時間です（ミリ秒）。
 */
function animateTranslate(targetID, time, endX, endY, delay) {
  const target = document.getElementById(targetID) // アニメーションの対象
  const style = getComputedStyle(target) // 対象のスタイルを取得
  const reg = /matrix\((.*)\)/ // 不要な文字列を取り除くための正規表現
  const transform = style.transform.match(reg)[1].split(',') // transform を配列として取得
  const startX = parseFloat(transform[4]) // X座標の始点
  const startY = parseFloat(transform[5]) // Y座標の始点
  const diffX = endX - startX // X座標の変化量
  const diffY = endY - startY // Y座標の変化量
  let progress = 0

  // アップデートを実行する
  requestAnimationFrame(update)

  function update(timestamp) {
    // 遅延時間を含めた進捗率を算出
    progress = (timestamp - delay) / time

    // 進捗率が100%を超えないよう丸める
    progress = Math.min(progress, 1)

    // 進捗率がプラスの場合のみ値を算出し反映する
    if (progress >= 0) {
      const resultX = startX + diffX * progress // X座標
      const resultY = startY + diffY * progress // Y座標
      target.style.transform = `translate( ${resultX}px, ${resultY}px )`
    }

    // 進捗が1未満の場合はアップデートを再実行する
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
}

// ロード時にモーダル表示
window.onload = () => {
  startDialog.ariaModal = 'true'
  startDialog.role = 'dialog'
  startDialog.style = 'display: block;'
  startDialog.classList.add('show')
}

// モーダルの表示の設定
const modal = function () {
  resultDialog.ariaModal = 'true'
  resultDialog.role = 'dialog'
  resultDialog.style = 'display: block;'
  resultDialog.classList.add('show')
  resultDialog.setAttribute('aria-hidden', 'true')
}

// スタート押下時
startButton.addEventListener('click', function () {
  startDialog.remove()
  modalWrapper.style.visibility = 'hidden'
  animateTranslate('oji', 5000, -800, 0, 1000)
  setTimeout('gameResult()', 5000)
})
;('use strict')
const body = document.querySelector('body')
const background = document.querySelector('.background')
const countDisplay = document.querySelector('.countDisplay')
const result = document.querySelector('.result')

// パソコンかスマートフォンか判定
const eventType = window.ontouchstart !== null ? 'click' : 'touchstart'
const addCount = function (e) {
  // クリックをカウント・表示
  count++
  countDisplay.textContent = count
  // クリック時のアニメーション
  let x = e.pageX
  let y = e.pageY
  const mash = document.createElement('div')
  mash.style.top = y + 'px'
  mash.style.left = x + 'px'
  document.body.appendChild(mash)
  mash.className = 'mash'
  mash.addEventListener('animationend', () => {
    mash.parentNode.removeChild(mash)
  })

  if (count >= 5) {
    document.getElementById('blockAbove').style.visibility = 'hidden'
  }
  if (count >= 15) {
    document.getElementById('blockSecond').style.visibility = 'hidden'
  }
  if (count >= 25) {
    document.getElementById('blockThird').style.visibility = 'hidden'
  }
  if (count >= 35) {
    document.getElementById('blockFourth').style.visibility = 'hidden'
  }
}

// START押下時
function gameResult() {
  // 結果の浮き出し文字制御
  fadeIn.classList.add('blur')
  modalWrapper.style.visibility = 'visible'

  const countDisplay = document.querySelector('.countDisplay')
  var num = Number(countDisplay.textContent)

  if (num > 10) {
    fadeIn.innerText = 'やばい！'
    resultTitle.innerText = '嫁めっちゃ怒ってるぞww！！'
    resultBody.innerHTML =
      'あっ、嫁からLINEだ。「GPSついてるからね？。。」あっっ！？（汗）。。。。またチャレンジしてくれよな！'
  }

  if (num > 25) {
    fadeIn.innerText = '激突！！'
    resultTitle.innerText = '嫁ブロック突破失敗だ！！'
    resultBody.innerHTML = 'あっ、嫁から留守電だ。。。20件も来てるwww 今日は撤退だ！！またチャレンジしような！！！！！'
  }
  if (num > 34) {
    fadeIn.innerText = '突破！！'
    resultTitle.innerText = '嫁ブロックを突破したぞ！！'
    resultBody.innerHTML =
      '嫁の包囲網を突破したぞ！今月の給料は全てガジェットへ投資して一流エンジニアなってやる！！！！'
  }
  // 結果モーダル出力
  setTimeout(modal, 3000)
}

// 背景を縮めるアニメーション
const shrinkAnim = function () {
  countDisplay.classList.remove('blink')
  body.removeEventListener(eventType, shrinkAnim)
  body.addEventListener(eventType, addCount)
  background
    .animate(
      {
        width: ['350px', '0px'],
        height: ['350px', '0px'],
        opacity: [1, 0.5, 1],
        offset: [0, 0.9],
      },
      { duration: 4700, fill: 'forwards' }
    )
    .finished // ゲーム終了後の処理
    .then(() => {
      body.removeEventListener(eventType, addCount)
      result.textContent = 'push! push!'
      result.classList.add('blink')
      result.addEventListener('click', () => {
        location.reload()
      })
    })
}
body.addEventListener(eventType, shrinkAnim)
