class Level {
  constructor(
    public name: string,
    public keys: string[],
    public level: number = 1,
  ) {
    console.log('Level', this.name, this.keys, this.level);
  }

  get title() {
    return `Level ${this.level} - ${this.name}`;
  }
}

export const levels = [
  new Level('ASDFG', ['A', 'S', 'D', 'F', 'G'], 1),
  new Level('ASDF LKJH', ['A', 'S', 'D', 'F', ' ', 'L', 'K', 'J', 'H'], 2),
  new Level('Middle line', ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'], 3),
  new Level('QWERT', ['Q', 'W', 'E', 'R', 'T'], 4),
  new Level('POIU', ['P', 'O', 'I', 'U'], 5),
  new Level('POIUY', ['P', 'O', 'I', 'U', 'Y'], 6),
  new Level('Top line', ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 7),
  new Level('First and second line', ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G'], 8),
  new Level('ZXCV', ['Z', 'X', 'C', 'V'], 9),
  new Level('ZXCVB', ['Z', 'X', 'C', 'V', 'B'], 10),
  new Level('MN', ['M', 'N'], 11),
  new Level('Bottom line', ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], 12),
  new Level('Common words', ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A',
    'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'], 13),
];
