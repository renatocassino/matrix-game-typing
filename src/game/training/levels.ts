import { TrainingWave } from './types/types';

export class TrainingLevel {
  public keys: string[];

  constructor(
    public name: string,
    keys: string | string[],
    public level: number = 1,
    public waves: TrainingWave[],
  ) {
    this.keys = Array.isArray(keys) ? keys : keys.split('');
  }

  get title() {
    return `Level ${this.level} - ${this.name}`;
  }
}

let level = 1;
export const levels = [
  new TrainingLevel('ASDFG', 'ASDFG', level++, [
    {
      words: ['a', 's', 'd', 'f'],
      wordsToFall: 15,
    },
    {
      words: ['da', 'fa', 'sa'],
      wordsToFall: 15,
    },
    {
      words: ['fada', 'sasa', 'dada', 'fasa', 'safada'],
      wordsToFall: 15,
    },
    {
      words: ['a', 's', 'd', 'f', 'g'],
      wordsToFall: 15,
    },
    {
      words: ['gaga', 'faga', 'saga', 'daga', 'agaga'],
      wordsToFall: 15,
    },
    {
      words: ['adaga', 'asaga', 'afaga', 'agaga', 'adaga'],
      wordsToFall: 15,
    },
  ]),
  new TrainingLevel('ASDF LKJH', 'ASDFGLKJH', level++, []),
  new TrainingLevel('Middle line', 'ASDFGLKJH', level++, []),
  new TrainingLevel('QWERT', 'QWERT', level++, []),
  new TrainingLevel('POIU', 'POIUY', level++, []),
  new TrainingLevel('Top line', 'QWERTPOIUY', level++, []),
  new TrainingLevel('First and second line', 'QWERTYUIOPASDFGHJKL', level++, []),
  new TrainingLevel('ZXCV', 'ZXCVB', level++, []),
  new TrainingLevel('MN', 'MN', level++, []),
  new TrainingLevel('Bottom line', 'ZXCVBNM', level++, []),
  new TrainingLevel('Common words', 'QWERTYUIOPASDFGHJKLZXCVBNM', level++, []),
];
