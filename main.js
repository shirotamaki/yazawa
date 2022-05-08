#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')
const readline = require('readline')

class Display {
  constructor (time) {
    this.time = time
  }

  firstMessage () {
      console.log('\n' +
        ' __   __     _      _____     _     __        __     _ \n' +
        ' \\ \\ / /    / \\    |__  /    / \\    \\ \\      / /    / \\ \n' +
        '  \\ V /    / _ \\     / /    / _ \\    \\ \\ /\\ / /    / _ \\ \n' +
        '   | |    / ___ \\   / /_   / ___ \\    \\ V  V /    / ___ \\ \n' +
        '   |_|   /_/   \\_\\ /____| /_/   \\_\\    \\_/\\_/    /_/   \\_\\ \n'
      )
      console.log('キミの悩みにYAZAWAがロックなアドバイスをするぜ!')
  }

  userNameInput () {
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
    console.log(`\nセンキュー ${name} !! \n`)
  }

  async selectWorry () {
    const prompt = new Select({
      name: 'advisement',
      message: 'YAZAWAに相談したい内容をセレクトしてくれ！',
      choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', 'とくにない']
    })

    return await prompt.run().then(selectedWorry => {
      return selectedWorry
    }).catch(console.error)
  }

  selectAdvise (name, advice) {
    const obj = {
      仕事: 'やり続けることしかないということだけですよ。自分の仕事にオレ才能あるんだと\n',
      お金: `${name}の一生かかって稼ぐ金、YAZAWAの2秒。そこんとこ、ヨロシク！\n`,
      恋愛: `アイ・ラブ・ユー オーケー？言っちゃえよ${name}！\n`,
      人生: `${name}の人生なんだから。てめぇで走れ！\n`,
      夢: 'ドアの向こうに夢があるなら、ドアが開くまで叩き続けるんだ！\n',
      挑戦: '最近勝ち組とか負け組みとか流行っているけど、スタート切っているかどうかがボクは大事だと思うけどね\n',
      挫折: '最初、サンザンな目にあう。二度目、オトシマエをつける。三度目、余裕\n',
      幸せ: `アー・ユー・ハッピー？ ${name}はすでにハッピーなはずだぜ\n`,
      老い: '年とるってのは細胞が老けることであって、魂が老けることじゃない\n',
      とくにない: 'ボクは別にいいんだけど、YAZAWAがなんて言うかな？\n'
    }
    return obj[advice]
  }

  displayLine () {
    console.log('-----------------------------------------------------------------')
  }

  lastMessage (count) {
    setTimeout(() => {
    console.log('-----------------------------------------------------------------')
    console.log(
      '  ____    ___     ___    ____      _       _   _    ____   _  __ \n' +
      ' / ___|  / _ \\   / _ \\  |  _ \\    | |     | | | |  / ___| | |/ / \n' +
      '| |  _  | | | | | | | | | | | |   | |     | | | | | |     | \' / \n' +
      '| |_| | | |_| | | |_| | | |_| |   | |___  | |_| | | |___  | . \\ \n' +
      ' \\____|  \\___/   \\___/  |____/    |_____|  \\___/   \\____| |_|\\_\\'
    )
    }, count)
  }

  typewriter (text) {
    return new Promise((resolve) => {
      let speed = this.time
      let displayText = text.split("")
      return displayText.forEach((char, index) => {
        setTimeout(() => {
          process.stdout.write(char)
          resolve()
        }, speed * index)
      })
    })
  }
}

class Main {
  constructor(time) {
    this.display = new Display(time)
    this.time = time
  }

  async run() {
    await this.display.firstMessage()
    const name = await this.display.userNameInput()
    await this.display.thankMessage(name)
    const selectedWorry = await this.display.selectWorry()
    const selectedAdvice = await this.display.selectAdvise(name, selectedWorry)
    await this.display.displayLine()
    await this.display.typewriter(selectedAdvice)
    const count = this.time * selectedAdvice.length
    await this.display.lastMessage(count)
  }
}

const main = new Main(50)
main.run()
