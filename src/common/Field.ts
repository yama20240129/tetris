export class Field {
    private field: number[][]
  
    constructor(data?: number[][]) {
      if(data) {
        this.field = data;
      } else {
        // 3-1 で作成したテトリスのフィールドを定義するコード
        const row = 20;
        const column = 10;
  
        const data = new Array<Array<number>>(row);
  
        for (let i = 0; i < row; i++) {
          const fieldColumn = new Array(column).fill(0);
          data[i] = fieldColumn;
        }
  
        this.field = data;
      }
    }
  
    get data(): number[][] {
      return this.field;
    }
  
    update = (data: number[][], position: {x: number, y: number}): void => {
      for (var i = 0; i < data.length; i++) {
        const cols = data[i];
        for (var j = 0; j < cols.length; j++) {
          const block = cols[j];
          if (block > 0) {
            this.field[i + position.y][j + position.x] = block;
          }
        }
      }
    }
  
    static deepCopy = (field: Field): Field => {
      const data = field.data;
      const newFieldData = new Array<Array<number>>(data.length);
      for (const [i, rows] of data.entries()) {
        newFieldData[i] = new Array(rows.length);
        for (const [j] of rows.entries()) {
          newFieldData[i][j] = data[i][j];
        }
      }
  
      return new Field(newFieldData);
    }

    canMove = (data: number[][], position: {x: number, y: number}): boolean => {
        const y_max = this.field.length;
        const x_max = this.field[0].length;
     
        if (position.y >= y_max) return false;
     
        for (var i = 0; i < data.length; i++) {
          const rows = data[i];
          for (var j = 0; j < rows.length; j++) {
            const block = rows[j];
            if (block > 0) {
              if (i + position.y > y_max - 1 ||
                  0 > j + position.x ||
                  j + position.x > x_max - 1 ||
                  this.field[i + position.y][j + position.x] > 0) {
                return false;
              }
            }
          }
        }
        return true;
      }

  }
  