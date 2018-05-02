export class Base64Encoder {

    public static CHARSET_UTF_8:string = "UTF-8";

    public static newLine:number = 10;

    constructor() {
        this.reset();
    }

    insertNewLines:Boolean = true;

    drain():string {
        let result:string = "";

        for (let i:number = 0; i < this._buffers.length; i++) {
            let buffer:Array<any> = this._buffers[i];
            result += String.fromCharCode.apply(null, buffer);
        }

        this._buffers = [];
        this._buffers.push([]);

        return result;
    }

    encode(data:string, offset:number = 0, length:number = 0):void {
        if (length === 0)
            length = data.length;

        let currentIndex:number = offset;

        let endIndex:number = offset + length;
        if (endIndex > data.length)
            endIndex = data.length;

        while (currentIndex < endIndex) {
            this._work[this._count] = data.charCodeAt(currentIndex);
            this._count++;

            if (this._count === this._work.length || endIndex - currentIndex === 1) {
                this.encodeBlock();
                this._count = 0;
                this._work[0] = 0;
                this._work[1] = 0;
                this._work[2] = 0;
            }
            currentIndex++;
        }
    }

    reset():void {
        this._buffers = [];
        this._buffers.push([]);
        this._count = 0;
        this._line = 0;
        this._work[0] = 0;
        this._work[1] = 0;
        this._work[2] = 0;
    }

    flush():string {
        if (this._count > 0)
            this.encodeBlock();

        let result:string = this.drain();
        this.reset();
        return result;
    }

    private encodeBlock():void {
        let currentBuffer:Array<any> = this._buffers[this._buffers.length - 1];
        if (currentBuffer.length >= Base64Encoder.MAX_BUFFER_SIZE) {
            currentBuffer = [];
            this._buffers.push(currentBuffer);
        }

        currentBuffer.push(Base64Encoder.ALPHABET_CHAR_CODES[(this._work[0] & 0xFF) >> 2]);
        currentBuffer.push(Base64Encoder.ALPHABET_CHAR_CODES[((this._work[0] & 0x03) << 4) | ((this._work[1] & 0xF0) >> 4)]);

        if (this._count > 1)
            currentBuffer.push(Base64Encoder.ALPHABET_CHAR_CODES[((this._work[1] & 0x0F) << 2) | ((this._work[2] & 0xC0) >> 6) ]);
        else
            currentBuffer.push(Base64Encoder.ESCAPE_CHAR_CODE);

        if (this._count > 2)
            currentBuffer.push(Base64Encoder.ALPHABET_CHAR_CODES[this._work[2] & 0x3F]);
        else
            currentBuffer.push(Base64Encoder.ESCAPE_CHAR_CODE);

        if (this.insertNewLines) {
            if ((this._line += 4) === 76) {
                currentBuffer.push(Base64Encoder.newLine);
                this._line = 0;
            }
        }
    }

    private _buffers:Array<any>;
    private _count:number;
    private _line:number;
    private _work:Array<any> = [ 0, 0, 0 ];

    public static  MAX_BUFFER_SIZE:number = 32767;

    private static  ESCAPE_CHAR_CODE:number = 61;

    private static  ALPHABET_CHAR_CODES:Array<any> =
    [
        65,   66,  67,  68,  69,  70,  71,  72,
        73,   74,  75,  76,  77,  78,  79,  80,
        81,   82,  83,  84,  85,  86,  87,  88,
        89,   90,  97,  98,  99, 100, 101, 102,
        103, 104, 105, 106, 107, 108, 109, 110,
        111, 112, 113, 114, 115, 116, 117, 118,
        119, 120, 121, 122,  48,  49,  50,  51,
        52,   53,  54,  55,  56,  57,  43,  47
    ];

}