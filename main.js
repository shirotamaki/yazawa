#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')
const readline = require('readline')

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

function thankMessage (name) {
  console.log(`\nサンキュー ${name} !! \n`)
}

async function selectWorry () {
  const prompt = new Select({
    name: 'advisement',
    message: 'YAZAWAに相談したい内容をセレクト！',
    choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', 'とくにない']
  })

  return await prompt.run()
    .then( selectedWorry => {
    return selectedWorry
    })
    .catch(console.error)
}

async function selectAdvise (name, answer) {
  const obj = {
    仕事: 'やり続けることしかないということだけですよ。自分の仕事にオレ才能あるんだと',
    お金: `${name}の一生かかって稼ぐ金、YAZAWAの2秒。そこんとこ、ヨロシク！`,
    恋愛: `アイ・ラブ・ユー オーケー？言っちゃえよ${name}！`,
    人生: `${name}の人生なんだから。てめぇで走れ！`,
    夢: 'ドアの向こうに夢があるなら、ドアが開くまで叩き続けるんだ！',
    挑戦: '最近勝ち組とか負け組みとか流行っているけど、スタート切っているかどうかがボクは大事だと思うけどね',
    挫折: '最初、サンザンな目にあう。二度目、オトシマエをつける。三度目、余裕',
    幸せ: `アー・ユー・ハッピー？ ${name}はすでにハッピーなはずだぜ`,
    老い: '年とるってのは細胞が老けることであって、魂が老けることじゃない',
    とくにない: 'ボクは別にいいんだけど、YAZAWAがなんて言うかな？'
  }
  return obj[answer]
}

async function displayAdvice (selectedAdvice) {
  console.log('-------------------------------------------------------------')
  await typewriter(selectedAdvice)
  console.log('-------------------------------------------------------------')
}

function lastMessage () {
  console.log(
    '  ____    ___     ___    ____      _       _   _    ____   _  __ \n' +
    ' / ___|  / _ \\   / _ \\  |  _ \\    | |     | | | |  / ___| | |/ / \n' +
    '| |  _  | | | | | | | | | | | |   | |     | | | | | |     | \' / \n' +
    '| |_| | | |_| | | |_| | | |_| |   | |___  | |_| | | |___  | . \\ \n' +
    ' \\____|  \\___/   \\___/  |____/    |_____|  \\___/   \\____| |_|\\_\\'
  )
}

function typewriter (text) {
  let speed = 50
  let displayText = text.split("")
  displayText.forEach((char, index) => {
    setTimeout(() => {
      process.stdout.write(char)
    }, speed * index)
  })
}

async function main () {
  await firstMessage()
  const name = await userNameInput()
  thankMessage(name)
  const selectedWorry = await selectWorry()
  const selectedAdvice = await selectAdvise(name, selectedWorry)
  // const displayText = typewriter(selectedAdvice)
  const foo = await displayAdvice(selectedAdvice)
  await lastMessage()
}

main()
