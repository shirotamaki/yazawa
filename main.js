#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer');
const readline = require('readline');

async function advise(name, answer) {
  const obj = {
    仕事: `YAZAWA、${name}の仕事、一生断らないから`,
    お金: `${name}の一生かかって稼ぐ金、YAZAWAの2秒。そこんとこ、ヨロシク！`,
    恋愛: `アイ・ラブ・ユー　オーケー?　言っちゃえよ${name}！`,
    人生: `${name}の人生なんだから。てめぇで走れ！`,
    夢: `ドアの向こうに夢があるなら、ドアが開くまで叩き続けるんだ！`,
    挑戦: `最近勝ち組とか負け組みとか流行っているけど、スタート切っているかどうかがボクは大事だと思うけどね`,
    挫折: `最初、サンザンな目にあう。二度目、オトシマエをつける。三度目、余裕`,
    幸せ: `アー・ユー・ハッピー？${name}はすでにハッピーなはずだぜ`,
    老い: `年とるってのは細胞が老けることであって、魂が老けることじゃない`,
    相談したいことはない: `ボクは別にいいんだけど、YAZAWAがなんて言うかな？`
  }
  return obj[answer]
}

async function explain() {
  console.log('\n' +
    '__  __   ___   ____   ___   _      __   ___\n' +
    '\\ \\/ /  / _ | /_  /  / _ | | | /| / /  / _ |\n' +
    ' \\  /  / __ |  / /_ / __ | | |/ |/ /  / __ |\n' +
    ' /_/  /_/ |_| /___//_/ |_| |__/|__/  /_/ |_|\n'
  )
  console.log('キミの悩みにYAZAWAがアドバイスをくれるよ')
}

// 名前の標準入力
async function readUserInput (question) {
  const inputData = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    inputData.question(question, (answer) => {
      resolve(answer)
      inputData.close()
    })
  })
}

// クイズ用メソッド
async function worry () {
  const prompt = new Select({
    name: 'advisement', // 選択された答えのオブジェクト
    message: 'YAZAWAに相談したい内容をセレクトしよう！', // 説明文
    choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', '相談したいことはとくない'], // 相談リスト
  });

 return await prompt.run()
  .then( choicedObj => {
     const selectedWorry = choicedObj
     return selectedWorry
  })
  .catch(console.error)
}

// mianロジック
async function main () {
  await explain ()
  const name = await readUserInput(`まずはユーの名前を教えてくれ\nニックネームを入力してエンターでカモン！！\n`)
  console.log(`サンキュー　${name} !! \n`)
  const selectedWorry = await worry()
  const selectedAdvice = await advise(name, selectedWorry)
  console.log('\n' +
  '---------------------------------------------------------------------\n' +
  ` ${selectedAdvice} \n` +
  '---------------------------------------------------------------------\n' +
'\n')
  console.log('\n' +
    `  ____    ___     ___    ____      _       _   _    ____   _  __ \n` +
    ` / ___|  / _ \\   / _ \\  |  _ \\    | |     | | | |  / ___| | |/ / \n` +
    `| |  _  | | | | | | | | | | | |   | |     | | | | | |     | ' / \n` +
    `| |_| | | |_| | | |_| | | |_| |   | |___  | |_| | | |___  | . \\ \n` +
    ` \\____|  \\___/   \\___/  |____/    |_____|  \\___/   \\____| |_|\\_\\ \n`
  )
}

main()

