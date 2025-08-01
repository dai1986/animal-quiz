const quizData = [
    {
        image: 'images/k0228_1.jpg', // アヒル
        answer: 'あひる',
        choices: ['あひる', 'かも', 'がちょう']
    },
    {
        image: 'images/k0116_1.jpg', // ラクダ
        answer: 'らくだ',
        choices: ['らくだ', 'こうし', 'らま']
    },
    {
        image: 'images/k0130_1.jpg', // イタチ
        answer: 'ねこ',
        choices: ['ねこ', 'おおかみ', 'きつね']
    },
    {
        image: 'images/k0148_1.jpg', // ニワトリ
        answer: 'にわとり',
        choices: ['にわとり', 'きじ', 'くじゃく']
    },
    {
        image: 'images/k0057_1.jpg', // コウモリ
        answer: 'こうもり',
        choices: ['こうもり', 'ふくろう', 'わし']
    },
    {
        image: 'images/k0131_1.jpg', // ネコ
        answer: 'ねこ',
        choices: ['ねこ', 'いぬ', 'らいおん']
    },
    {
        image: 'images/k0061_1.jpg', // クマ
        answer: 'くま',
        choices: ['くま', 'いのしし', 'ぱんだ']
    },
    {
        image: 'images/k0233_3.jpg', // ゾウ
        answer: 'ぞう',
        choices: ['ぞう', 'さい', 'かば']
    },
    {
        image: 'images/k0610_1.jpg', // アシカ
        answer: 'あざらし',
        choices: ['まぐろ', 'あざらし', 'いるか']
    },
    {
        image: 'images/k0365_1.jpg', // ヒヨコ
        answer: 'ひよこ',
        choices: ['ひよこ', 'すずめ', 'つばめ']
    },
    {
        image: 'images/k0874_3.jpg', // イヌ
        answer: 'いぬ',
        choices: ['いぬ', 'おおかみ', 'きつね']
    },
    {
        image: 'images/k0416_1.jpg', // オオトカゲ
        answer: 'とかげ',
        choices: ['とかげ', 'へび', 'わに']
    },
    {
        image: 'images/k0358_1.jpg', // ハリネズミ
        answer: 'はりねずみ',
        choices: ['はりねずみ', 'はむすたー', 'もぐら']
    },
    {
        image: 'images/k0425_1.jpg', // ライオン
        answer: 'らいおん',
        choices: ['らいおん', 'とら', 'ひょう']
    },
    {
        image: 'images/k0300_1.jpg', // キリン
        answer: 'きりん',
        choices: ['きりん', 'しまうま', 'だちょう']
    },
    {
        image: 'images/k0676_1.jpg', // リス
        answer: 'りす',
        choices: ['りす', 'ねずみ', 'はむすたー']
    },
    {
        image: 'images/k0939_1.jpg', // ブタ
        answer: 'ぶた',
        choices: ['ぶた', 'いのしし', 'かば']
    },
    {
        image: 'images/k0467_4.jpg', // ネズミ
        answer: 'ねずみ',
        choices: ['ねずみ', 'りす', 'もるもっと']
    },
    {
        image: 'images/k0524_1.jpg', // ペンギン
        answer: 'ぺんぎん',
        choices: ['ぺんぎん', 'あざらし', 'かもめ']
    },
    {
        image: 'images/k0373_1.jpg', // ウマ
        answer: 'うま',
        choices: ['うま', 'しまうま', 'ろば']
    },
    {
        image: 'images/k0563_1.jpg', // ウサギ
        answer: 'うさぎ',
        choices: ['うさぎ', 'もるもっと', 'はむすたー']
    },
    {
        image: 'images/k0319_1.jpg', // ゴリラ
        answer: 'ごりら',
        choices: ['ごりら', 'ちんぱんじー', 'おらうーたん']
    },
    {
        image: 'images/k0396_1.jpg', // カンガルー
        answer: 'かんがるー',
        choices: ['かんがるー', 'ぱんだ', 'こあら']
    }
];

const silhouetteImage = document.getElementById('silhouette-image');
const choiceButtons = [
    document.getElementById('choice1'),
    document.getElementById('choice2'),
    document.getElementById('choice3')
];
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display'); // スコア表示要素を取得
const restartButton = document.getElementById('restart-button'); // リスタートボタン要素を取得

const MAX_QUESTIONS = 10; // 出題する問題数を10に設定
let currentQuizIndex = 0;
let shuffledQuizData = [];
let score = 0; // スコアを初期化

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を交換
    }
    return array;
}

// クイズを開始する関数
function startQuiz() {
    // 全てのクイズデータからランダムに10問を選択
    shuffledQuizData = shuffleArray([...quizData]).slice(0, MAX_QUESTIONS);
    currentQuizIndex = 0;
    score = 0; // スコアをリセット
    updateScoreDisplay(); // スコア表示を初期化
    restartButton.style.display = 'none'; // リスタートボタンを非表示に
    loadQuiz();
}

// クイズを読み込む関数
function loadQuiz() {
    // 状態をリセット
    feedbackMessage.textContent = '';
    feedbackMessage.className = ''; // クラスをリセット
    nextButton.style.display = 'none';

    // 全ての選択肢ボタンを有効にする
    choiceButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('correct-choice', 'wrong-choice'); // 前回の状態をクリア
    });

    if (currentQuizIndex < MAX_QUESTIONS) { // MAX_QUESTIONSまで出題
        const currentQuiz = shuffledQuizData[currentQuizIndex];
        silhouetteImage.src = currentQuiz.image;
        updateScoreDisplay(); // 各問題表示時にスコアを更新

        // 選択肢をシャッフル
        const shuffledChoices = shuffleArray([...currentQuiz.choices]);

        choiceButtons.forEach((button, index) => {
            button.textContent = shuffledChoices[index];
            button.onclick = () => checkAnswer(button, currentQuiz.answer);
        });
    } else {
        // 全問終了
        silhouetteImage.src = ''; // 画像をクリア
        choiceButtons.forEach(button => {
            button.textContent = '';
            button.disabled = true;
        });
        feedbackMessage.textContent = `くいずしゅうりょう！ ${MAX_QUESTIONS}もんちゅう ${score}もんせいかいでした！`; // 最終スコア表示
        feedbackMessage.className = 'correct'; // 全問終了時のメッセージは緑色に
        restartButton.style.display = 'block'; // 「もういちどぷれい」ボタンを表示
    }
}

// 解答をチェックする関数
function checkAnswer(selectedButton, correctAnswer) {
    // 全ての選択肢ボタンを無効にする
    choiceButtons.forEach(button => button.disabled = true);

    if (selectedButton.textContent === correctAnswer) {
        feedbackMessage.textContent = 'せいかい！';
        feedbackMessage.className = 'correct';
        selectedButton.classList.add('correct-choice'); // 正解ボタンにスタイルを適用
        score++; // 正解したらスコアを加算
    } else {
        feedbackMessage.textContent = `ふせいかい！せいかいは「${correctAnswer}」でした。`;
        feedbackMessage.className = 'wrong';
        selectedButton.classList.add('wrong-choice'); // 不正解ボタンにスタイルを適用
        // 正解の選択肢をハイライト
        choiceButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct-choice');
            }
        });
    }
    updateScoreDisplay(); // スコアを更新
    nextButton.style.display = 'block'; // 「つぎのもんだいへ」ボタンを表示
}

// スコア表示を更新する関数
function updateScoreDisplay() {
    scoreDisplay.textContent = `いまのすこあ: ${score} / ${currentQuizIndex + 1}もん`;
    // 全問終了時は合計問題数を表示
    if (currentQuizIndex >= MAX_QUESTIONS) {
        scoreDisplay.textContent = `さいしゅうすこあ: ${score} / ${MAX_QUESTIONS}もん`;
    }
}


// 次の問題へ進む関数
nextButton.addEventListener('click', () => {
    currentQuizIndex++;
    loadQuiz();
});

// リスタートボタンがクリックされたときの処理
restartButton.addEventListener('click', () => {
    startQuiz(); // クイズを最初からやり直す
});

// クイズ開始
startQuiz();