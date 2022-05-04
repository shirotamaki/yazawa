#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')
const readline = require('readline')

async function selectAdvise (name, answer) {
  const obj = {
    仕事: 'やり続けることしかないということだけですよ。自分の仕事にオレ才能あるんだと',
    お金: `${name}の一生かかって稼ぐ金、YAZAWAの2秒。そこんとこ、ヨロシク！`,
    恋愛: `アイ・ラブ・ユー オーケー?言っちゃえよ${name}！`,
    人生: `${name}の人生なんだから。てめぇで走れ！`,
    夢: 'ドアの向こうに夢があるなら、ドアが開くまで叩き続けるんだ！',
    挑戦: '最近勝ち組とか負け組みとか流行っているけど、スタート切っているかどうかがボクは大事だと思うけどね',
    挫折: '最初、サンザンな目にあう。二度目、オトシマエをつける。三度目、余裕',
    幸せ: `アー・ユー・ハッピー？ ${name}はすでにハッピーなはずだぜ`,
    老い: '年とるってのは細胞が老けることであって、魂が老けることじゃない',
    相談したいことはない: 'ボクは別にいいんだけど、YAZAWAがなんて言うかな？'
  }
  return obj[answer]
}

async function firstMessage () {
  console.log('\n' +
' __   __     _      _____     _     __        __     _ \n' +
' \\ \\ / /    / \\    |__  /    / \\    \\ \\      / /    / \\ \n' +
'  \\ V /    / _ \\     / /    / _ \\    \\ \\ /\\ / /    / _ \\ \n' +
'   | |    / ___ \\   / /_   / ___ \\    \\ V  V /    / ___ \\ \n' +
'   |_|   /_/   \\_\\ /____| /_/   \\_\\    \\_/\\_/    /_/   \\_\\ \n'
  )
  console.log('キミの悩みにYAZAWAがロックなアドバイスをくれるよ')
}

async function userNameInput () {
  const question = 'まずはキミの名前を教えてくれ！\nニックネームを入力してエンターでカモン！！\n'
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

async function selectWorry () {
  const prompt = new Select({
    name: 'advisement', // 選択された答えのオブジェクト
    message: 'YAZAWAに相談したい内容をセレクト！', // 説明文
    choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', '相談したいことはない'] // 相談リスト
  })

  return await prompt.run()
    .then(choicedObj => {
      const selectedWorry = choicedObj
      return selectedWorry
    })
    .catch(console.error)
}

async function displayAdvice (selectedAdvice) {
  console.log(
    '-------------------------------------------------------------\n' +
    ` ${selectedAdvice}\n` +
    '--------------------------------------------------------------\n'
  )
}

async function thankMessage (name) {
  console.log(`\nサンキュー ${name} !! \n`)
}

async function lastMessage () {
  console.log(
    '  ____    ___     ___    ____      _       _   _    ____   _  __ \n' +
    ' / ___|  / _ \\   / _ \\  |  _ \\    | |     | | | |  / ___| | |/ / \n' +
    '| |  _  | | | | | | | | | | | |   | |     | | | | | |     | \' / \n' +
    '| |_| | | |_| | | |_| | | |_| |   | |___  | |_| | | |___  | . \\ \n' +
    ' \\____|  \\___/   \\___/  |____/    |_____|  \\___/   \\____| |_|\\_\\'
  )
}

async function main () {
  await firstMessage()
  const name = await userNameInput()
  await thankMessage(name)
  const selectedWorry = await selectWorry()
  const selectedAdvice = await selectAdvise(name, selectedWorry)
  await displayAdvice(selectedAdvice)
  await lastMessage()
}
main()
