#!/usr/bin/env node
'use strict'

const keypress = require('keypress')
const { Select } = require('enquirer')
const readline = require('readline')

class Display {
  constructor () {
  }

  async firstMessage () {
      console.log('\n' +
        ' __   __     _      _____     _     __        __     _ \n' +
        ' \\ \\ / /    / \\    |__  /    / \\    \\ \\      / /    / \\ \n' +
        '  \\ V /    / _ \\     / /    / _ \\    \\ \\ /\\ / /    / _ \\ \n' +
        '   | |    / ___ \\   / /_   / ___ \\    \\ V  V /    / ___ \\ \n' +
        '   |_|   /_/   \\_\\ /____| /_/   \\_\\    \\_/\\_/    /_/   \\_\\ \n'
      )
      console.log('キミの悩みにYAZAWAがロックなアドバイスをプレゼント!')
  }

  async userNameInput () {
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

  thankMessage (name) {
    console.log(`\nサンキュー ${name} !! \nイカした名前だな！！\n`)
  }

  async selectWorry () {
    const prompt = new Select({
      name: 'advisement',
      message: 'YAZAWAに相談したい内容をセレクト！',
      choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', 'とくにない']
    })

    return await prompt.run().then(selectedWorry => {
      return selectedWorry
    }).catch(console.error)
  }

  async selectAdvise (name, answer) {
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

  async displayEnter () {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXX')
    process.stdin.resume()
    new Promise(r => process.stdin.once('data', r))
    .finally(() => process.stdin.pause())
  }

  displayLine () {
    console.log('-------------------------------------------------------------')
    // await typewriter(selectedAdvice)
    // console.log('-------------------------------------------------------------')
  }

  lastMessage () {
    console.log(
      '  ____    ___     ___    ____      _       _   _    ____   _  __ \n' +
      ' / ___|  / _ \\   / _ \\  |  _ \\    | |     | | | |  / ___| | |/ / \n' +
      '| |  _  | | | | | | | | | | | |   | |     | | | | | |     | \' / \n' +
      '| |_| | | |_| | | |_| | | |_| |   | |___  | |_| | | |___  | . \\ \n' +
      ' \\____|  \\___/   \\___/  |____/    |_____|  \\___/   \\____| |_|\\_\\'
    )
  }

  typewriter (text) {
    return new Promise((resolve) => {
      let speed = 50
      let displayText = text.split("")
      return displayText.forEach((char, index) => {
        setTimeout(() => {
          process.stdout.write(char)
          resolve()
        }, speed * index)
      })
    })
  }

//   async displayText (text) {
//     await typewriter(text)
//     displayLine()
//   }
}

class Main {
  constructor() {
    this.display = new Display()
  }

  async run() {
    await this.display.firstMessage()
    const name = await this.display.userNameInput()
    this.display.thankMessage(name)
    const selectedWorry = await this.display.selectWorry()
    const selectedAdvice = await this.display.selectAdvise(name, selectedWorry)
    await this.display.displayEnter()
    await this.display.displayLine()
    await this.display.typewriter(selectedAdvice)
    await this.display.lastMessage()
  }
}

const main = new Main()
main.run()
