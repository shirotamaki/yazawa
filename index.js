#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')
const readline = require('readline')

class Yazawa {
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
    console.log('キミの悩みにYAZAWAがロックなアドバイスをお届け!')
  }

  sayName () {
    const question = 'まずはキミの名前を教えてくれ！\nニックネームを入力してエンターでカモン!!\n'
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

  thanks (name) {
    console.log(`\nサンキュー ${name} !! \n`)
  }

  async selectWorry () {
    const prompt = new Select({
      name: 'advisement',
      message: 'YAZAWAに相談したい内容をセレクトしてくれ！',
      choices: ['仕事', 'お金', '恋愛', '人生', '夢', '挑戦', '挫折', '幸せ', '老い', 'とくになし']
    })

    return await prompt.run().then(selectedWorry => {
      return selectedWorry
    }).catch(console.error)
  }

  askForAdvice (name, advice) {
    const obj = {
      仕事: 'やり続けることしかないということだけですよ。自分の仕事にオレ才能あるんだと...\n',
      お金: `${name}の一生かかって稼ぐ金、YAZAWAの2秒。そこんとこ、ヨロシク！\n`,
      恋愛: `アイ・ラブ・ユー オーケー？ 言っちゃえよ${name}！\n`,
      人生: `${name}の人生なんだから... てめぇで走れ！\n`,
      夢: 'ドアの向こうに夢があるなら、ドアが開くまで叩き続けるんだ！\n',
      挑戦: '最近勝ち組とか負け組みとか流行っているけど、スタート切っているかどうかがボクは大事だと思うけどね\n',
      挫折: '最初、サンザンな目にあう。二度目、オトシマエをつける。三度目、余裕！\n',
      幸せ: `アー・ユー・ハッピー？ ${name}はすでにハッピーなはずだぜ！\n`,
      老い: '年をとるってのは細胞が老けることであって、魂が老けることじゃない\n',
      とくになし: 'ボクは別にいいんだけど...  YAZAWAがなんて言うかな？\n'
    }
    return obj[advice]
  }

  displayLine () {
    console.log('-----------------------------------------------------------------')
  }

  goodLuck (count) {
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
    const speed = this.time
    const displayText = text.split('')
    displayText.forEach((char, index) => {
      setTimeout(() => {
        process.stdout.write(char)
      }, speed * index)
    })
  }
}

class Main {
  constructor (time) {
    this.yazawa = new Yazawa(time)
    this.time = time
  }

  async run () {
    this.yazawa.firstMessage()
    const name = await this.yazawa.sayName()
    this.yazawa.thanks(name)
    const selectedWorry = await this.yazawa.selectWorry()
    const selectedAdvice = this.yazawa.askForAdvice(name, selectedWorry)
    this.yazawa.displayLine()
    this.yazawa.typewriter(selectedAdvice)
    const count = this.time * selectedAdvice.length
    this.yazawa.goodLuck(count)
  }
}

const main = new Main(70)
main.run()
