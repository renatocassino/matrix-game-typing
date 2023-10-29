import type { TrainingWave } from './types/types';

export class TrainingLevel {
  public keys: string[];

  constructor(
    public name: string,
    keys: string | string[],
    public level: number = 1,
    public waves: TrainingWave[]
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
      wordsToFall: 15
    },
    {
      words: ['da', 'fa', 'sa'],
      wordsToFall: 15
    },
    {
      words: ['fada', 'sasa', 'dada', 'fasa', 'safada'],
      wordsToFall: 15
    },
    {
      words: ['a', 's', 'd', 'f', 'g'],
      wordsToFall: 15
    },
    {
      words: ['gaga', 'faga', 'saga', 'daga', 'agaga'],
      wordsToFall: 15
    },
    {
      words: ['adaga', 'asaga', 'afaga', 'agaga', 'adaga'],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('LKJH', 'LKJH', level++, [
    {
      words: ['l', 'k', 'j', 'h'],
      wordsToFall: 15
    },
    {
      words: ['lk', 'lj', 'lh', 'kl', 'kj', 'kh', 'jl', 'jk', 'jh', 'hl', 'hk', 'hj'],
      wordsToFall: 15
    },
    {
      words: ['lala', 'laka', 'laja', 'laha', 'lalala', 'jaja', 'kaka', 'haha', 'laja', 'sala'],
      wordsToFall: 15
    },
    {
      words: ['lada', 'jaha', 'kasa', 'lasla', 'faka', 'sala', 'hada', 'kada', 'kafa'],
      wordsToFall: 15
    },
    {
      words: [
        'lala',
        'kada',
        'saha',
        'salada',
        'lakada',
        'lajaha',
        'shala',
        'lakasa',
        'lakafa',
        'fakada',
        'lasaja',
        'lasada',
        'alkaja'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'laskada',
        'hajada',
        'dakada',
        'kakasla',
        'lajaka',
        'jaka',
        'hakasla',
        'lakasaja',
        'lafakada'
      ],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('Middle line', 'ASDFGLKJH', level++, [
    {
      words: [
        'alg',
        'ash',
        'ask',
        'las',
        'hal',
        'gad',
        'gaf',
        'gak',
        'lag',
        'lad',
        'sad',
        'gaj',
        'sla',
        'fka',
        'gha',
        'dak',
        'jaf'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'alga',
        'slag',
        'lads',
        'saja',
        'daka',
        'salk',
        'fala',
        'lash',
        'faha',
        'faka',
        'faja',
        'gaga',
        'ghak',
        'hjak',
        'lhak',
        'lhad',
        'kahd',
        'jsfg'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'lasha',
        'shaka',
        'shala',
        'lhaka',
        'fhada',
        'galha',
        'dhala',
        'shakl',
        'laska',
        'jhada',
        'gakla',
        'dafla',
        'flash',
        'slash'
      ],
      wordsToFall: 15
    },
    {
      words: ['fadals', 'halsfad', 'slack', 'slash', 'flash'],
      wordsToFall: 15
    },
    {
      words: [
        'fadalda',
        'fafakala',
        'lakadsa',
        'jashalaka',
        'galhakas',
        'hakalak',
        'daklash',
        'safadala',
        'kalahsha'
      ],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('QWERT', 'QWERT', level++, [
    {
      words: ['q', 'w', 'e', 'r', 't'],
      wordsToFall: 15
    },
    {
      words: ['we', 'er', 're', 'qw', 'te'],
      wordsToFall: 15
    },
    {
      words: ['were', 'wert', 'qwer', 'trew', 'ewer'],
      wordsToFall: 15
    },
    {
      words: ['wet', 'ret', 'ter', 'ewt', 'wret'],
      wordsToFall: 15
    },
    {
      words: ['qwet', 'trewq', 'wertq', 'ewert', 'rqwe'],
      wordsToFall: 15
    },
    {
      words: ['qwerte', 'rewtq', 'qwert', 'etwqr', 'terqw'],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('POIUY', 'POIUY', level++, [
    {
      words: ['p', 'o', 'i', 'u', 'y'],
      wordsToFall: 15
    },
    {
      words: ['po', 'io', 'oy', 'up', 'yi'],
      wordsToFall: 15
    },
    {
      words: ['yup', 'poi', 'iou', 'yipo', 'uoiy'],
      wordsToFall: 15
    },
    {
      words: ['iuop', 'yupo', 'oipy', 'piyo', 'uioy'],
      wordsToFall: 15
    },
    {
      words: ['ouypi', 'piyou', 'ioupy', 'yuopi', 'opiyu'],
      wordsToFall: 15
    },
    {
      words: ['poiuy', 'yuiop', 'ioup', 'yuipo', 'pyuio'],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('Top Line', 'QWERTYUIOP', level++, [
    {
      words: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      wordsToFall: 20
    },
    {
      words: ['we', 'er', 'ty', 'ui', 'io', 'op', 'qw', 'yu'],
      wordsToFall: 20
    },
    {
      words: ['wert', 'trew', 'yuio', 'ioup', 'qwop', 'qwer'],
      wordsToFall: 20
    },
    {
      words: ['qwerty', 'ytrewq', 'uiopqw', 'poiuyt', 'weoi', 'yupio'],
      wordsToFall: 20
    },
    {
      words: ['qwertyu', 'poiuytr', 'qwopiu', 'trewio', 'qwertyuiop'],
      wordsToFall: 20
    },
    {
      words: ['qwertyuiop', 'poiuytrewq', 'qwertyop', 'ytrewiop'],
      wordsToFall: 20
    }
  ]),
  new TrainingLevel('Left hand up', 'ASDFGQWERT', level++, [
    {
      words: ['a', 's', 'd', 'f', 'g', 'q', 'w', 'e', 'r', 't'],
      wordsToFall: 20
    },
    {
      words: ['as', 'we', 'at', 'rat', 'art', 'tea', 'tar', 'tad'],
      wordsToFall: 20
    },
    {
      words: ['rate', 'dare', 'date', 'read', 'deaf', 'gear', 'waste', 'water'],
      wordsToFall: 20
    },
    {
      words: ['great', 'trade', 'rated', 'wader', 'waged', 'stare', 'grate', 'fared'],
      wordsToFall: 20
    },
    {
      words: ['faster', 'rafted', 'wafer', 'gated', 'waste', 'staged', 'drate', 'sweat'],
      wordsToFall: 20
    },
    {
      words: ['deft', 'gate', 'rage', 'taser', 'sward', 'wrest', 'grade', 'dater'],
      wordsToFall: 20
    }
  ]),
  new TrainingLevel('LKJHPOIUY', 'LKJHPOIUY', level++, [
    {
      words: ['l', 'k', 'j', 'h', 'p', 'o', 'i', 'u', 'y'],
      wordsToFall: 20
    },
    {
      words: ['lo', 'ho', 'up', 'oil', 'joy', 'yip', 'lip', 'hop'],
      wordsToFall: 20
    },
    {
      words: ['ploy', 'july', 'yolk', 'yup', 'loup', 'joil', 'hook', 'ploy'],
      wordsToFall: 20
    },
    {
      words: ['uphill', 'philly', 'lookup', 'holly', 'yokel', 'polio', 'joiky', 'plouk'],
      wordsToFall: 20
    },
    {
      words: ['loophy', 'joiplu', 'yolkup', 'poliky', 'holip', 'loujy'],
      wordsToFall: 20
    },
    {
      words: ['holipu', 'yolupi', 'hoikyl', 'poulik', 'yuhlip'],
      wordsToFall: 20
    }
  ]),
  new TrainingLevel('First and second line', '', level++, [
    {
      words: [
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'we',
        'as',
        'at',
        'rat',
        'so',
        'art',
        'tea',
        'ship',
        'oil',
        'up',
        'lip',
        'out',
        'pie',
        'tap'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'rate',
        'date',
        'ship',
        'yolk',
        'hike',
        'kite',
        'sight',
        'duke',
        'haste',
        'joke',
        'ripe'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'right',
        'dairy',
        'hairy',
        'joust',
        'youth',
        'leak',
        'soil',
        'drape',
        'loud',
        'quiet',
        'rake',
        'spike'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'drought',
        'sprout',
        'hurdle',
        'stored',
        'stride',
        'lashed',
        'spiked',
        'haste',
        'slight',
        'joked'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'outride',
        'plaster',
        'jousted',
        'shaped',
        'lied',
        'ploughed',
        'shorted',
        'hiked',
        'kilo',
        'jail'
      ],
      wordsToFall: 25
    }
  ]),
  new TrainingLevel('ZXCV', 'ZXCV', level++, [
    {
      words: ['z', 'x', 'c', 'v'],
      wordsToFall: 10
    },
    {
      words: ['cz', 'vc', 'xz', 'zx', 'cv', 'vx'],
      wordsToFall: 10
    },
    {
      words: ['zxc', 'cxv', 'vzx', 'xvc', 'cvz', 'zcv'],
      wordsToFall: 10
    },
    {
      words: ['zxcv', 'vcxz', 'cxzv', 'vzxc', 'xzcv', 'cvzx'],
      wordsToFall: 10
    }
  ]),
  new TrainingLevel('MN', 'MN', level++, [
    {
      words: ['m', 'n'],
      wordsToFall: 10
    },
    {
      words: ['mn', 'nm'],
      wordsToFall: 10
    },
    {
      words: ['mnm', 'nmn'],
      wordsToFall: 10
    },
    {
      words: ['mnmn', 'nmnm'],
      wordsToFall: 10
    }
  ]),
  new TrainingLevel('Bottom line', 'ZXCVBNM', level++, [
    {
      words: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      wordsToFall: 15
    },
    {
      words: ['cz', 'vc', 'xb', 'nm', 'bm', 'vz', 'cx', 'mn'],
      wordsToFall: 15
    },
    {
      words: ['zxc', 'cvb', 'bnm', 'vzn', 'cmb', 'nbz', 'xcv'],
      wordsToFall: 15
    },
    {
      words: ['zxcv', 'vbnm', 'bnzx', 'mnvc', 'cvbn', 'xzmn'],
      wordsToFall: 15
    },
    {
      words: ['zxcvb', 'vbnmz', 'bncvx', 'mnvzc', 'vbnxm', 'xzmnv'],
      wordsToFall: 15
    },
    {
      words: ['zxcvbn', 'vbnmzx', 'bnzxcv', 'mnvcbz', 'vbnmxz', 'mnvzxc'],
      wordsToFall: 15
    },
    {
      words: ['zxcvbnm', 'mnbvcxz'],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('Left hand Full', 'QWERTASDFGZXCVB', level++, [
    {
      words: ['a', 's', 'd', 'f', 'g', 'q', 'w', 'e', 'r', 't', 'z', 'x', 'c', 'v', 'b'],
      wordsToFall: 15
    },
    {
      words: [
        'as',
        'at',
        'rat',
        'art',
        'tea',
        'tar',
        'tad',
        'bad',
        'bet',
        'wad',
        'wet',
        'bed',
        'bat',
        'vet',
        'vex',
        'wax',
        'tax',
        'gas',
        'zag',
        'tag'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'rate',
        'dart',
        'dear',
        'wear',
        'wade',
        'fade',
        'gate',
        'date',
        'vest',
        'best',
        'rest',
        'west',
        'sage',
        'rage'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'great',
        'bread',
        'grade',
        'trade',
        'waste',
        'bread',
        'gated',
        'rated',
        'crate',
        'brave',
        'trace',
        'beast'
      ],
      wordsToFall: 15
    },
    {
      words: ['sweat', 'braved', 'craved', 'wasted', 'traced', 'faster', 'grated'],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('Right Hand Full', 'POIUYLKJHMN', level++, [
    {
      words: ['p', 'o', 'i', 'u', 'y', 'l', 'k', 'j', 'h', 'm', 'n'],
      wordsToFall: 15
    },
    {
      words: [
        'up',
        'on',
        'in',
        'no',
        'you',
        'oil',
        'joy',
        'yup',
        'lip',
        'hop',
        'lop',
        'yon',
        'pin',
        'pun',
        'mop',
        'nil',
        'yolk'
      ],
      wordsToFall: 15
    },
    {
      words: [
        'join',
        'link',
        'pink',
        'yolk',
        'yup',
        'holy',
        'punk',
        'milk',
        'ploy',
        'lynk',
        'monk',
        'lion',
        'limp',
        'lump',
        'yolk',
        'limn',
        'plum'
      ],
      wordsToFall: 15
    },
    {
      words: ['uplink', 'holly', 'plink', 'molly', 'yummy', 'lumpy', 'plump', 'linky', 'hymn'],
      wordsToFall: 15
    },
    {
      words: [
        'joypin',
        'unlink',
        'monkey',
        'unplug',
        'jumpy',
        'plumpy',
        'linky',
        'hopkin',
        'plumy'
      ],
      wordsToFall: 15
    }
  ]),
  new TrainingLevel('Full keyboard', 'QWERTYUIOPASDFGHJKLZXCVBNM', level++, [
    {
      words: [
        'the',
        'quick',
        'brown',
        'keyboard',
        'layout',
        'typing',
        'practice',
        'example',
        'words',
        'english'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'computer',
        'language',
        'function',
        'variable',
        'keyboard',
        'programming',
        'string',
        'integer',
        'database',
        'network'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'object',
        'oriented',
        'javascript',
        'framework',
        'application',
        'development',
        'platform',
        'server',
        'client',
        'webpage'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'design',
        'frontend',
        'backend',
        'middleware',
        'architecture',
        'interface',
        'hardware',
        'software',
        'plugin',
        'template'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'protocol',
        'algorithm',
        'encryption',
        'validation',
        'authentication',
        'integration',
        'optimization',
        'visualization',
        'interaction',
        'navigation'
      ],
      wordsToFall: 25
    },
    {
      words: [
        'frameworks',
        'libraries',
        'components',
        'modules',
        'functions',
        'variables',
        'instances',
        'properties',
        'methods',
        'events'
      ],
      wordsToFall: 25
    }
  ])
];
