
const text2 = "red,hover:green,lg:orange,lg:hover:pink,lg:hover:center";
// step 2 ==>"red,hover:green,lg:[orange,hover:pink,hover:center]"
// goal =  'red,hover:green,lg:orange,lg:hover:pink,lg:hover:center'

const text = "red,hover:green,lg:[orange,hover:[pink,center]]";
// step 2 ==>"red,hover:green,lg:[orange]"


/* 
I want to make a code than will convert a string of text by removing brakets like my exemple i give you bellow. If you know tailwind it's to convert to a tailwind like syntax. My code is a typescript
code. 
input String : red,hover:green,lg:[orange,hover:[pink,center]]
Output string wanted : red,hover:green,lg:orange,lg:hover:pink,lg:hover:center

Edit the code i give you 
*/
class TailwindCompressor {
    texte: string;
    constructor(texte: string) {
        this.texte = texte;
        this.Temp.set("Initial", texte);
    }
    get _texte() {
        return this.texte
    }

    set _texte(x: string) {
        this._texte.replace(this.Temp.get("Input") as string, x)
    }

    #nestedBrackets: RegExp = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");
    numberOfRegex = 0;

    Temp: Map<string, string> = new Map([
        ["PreviousInput", ""],
        ["Input", ""],
        ["Before", ""],
        ["Css", ""],
    ]);
    isNestingRegex(x = this.texte): boolean {
        const yesRegex = this.#nestedBrackets.test(x);
        return yesRegex;
    }
    TempInputUpdater(x: string) {
        const tempInput = this.#nestedBrackets.exec(x)?.[0] as string
        this.Temp.set("Input", tempInput);
        this.TempBeforeUpdater();
        this.TempCssUpdater();
    }
    TempBeforeUpdater() {
        const before = this.Temp.get("Input")?.match(this.#nestedBrackets)?.groups?.before ?? "error";
        if (before) {
            this.Temp.set("Before", before);
        } else {
            this.Temp.delete("Before");
        }
    }
    TempCssUpdater() {
        const css = this.Temp.get("Input")?.match(this.#nestedBrackets)?.groups?.css ?? "error";
        if (css) {
            this.Temp.set("Css", css as string);
        } else {
            console.log("else no css detected");
            this.Temp.delete("Css");
        }
    }
    recursiveFnRegex(x = this._texte) {
        if (this.isNestingRegex(x)) {
            if (this.numberOfRegex < 9) {
                this.numberOfRegex++;
                this.TempInputUpdater(x);
                this.recursiveFnRegex(this.Temp.get("css"))
                console.log('Map🔸🔸 ', this.Temp);
                console.log('this.numberOfRegex🔸🔸 ', this.numberOfRegex);
            }
        } else {
            console.log('no regex found');
            this.numberOfRegex--;
            this.Temp.delete("Input");
            this._texte &&= this.beforeAndCss(this.Temp.get("Before") ?? "error")
            this.numberOfRegex > 1 ? this.recursiveFnRegex() : console.log('finish');


        }
        


    }
    beforeAndCss(x: string): string {
        return x
            .split(",")
            .map((e: string) => `${this.Temp.get("Before")}:${e}`)
            .join(",");

    }
}

const cc = new TailwindCompressor("red,hover:green,lg:[orange,hover:[pink,center]]");


cc.recursiveFnRegex();
// console.log("cc.isNestingRegex()🔸🔸 ", cc.Temp);
// const ads = cc.isNestingRegex(cc._texte)
// console.log('cc.isNestingRegex🔸🔸 ', ads);
// cc.TempInputUpdater(cc._texte)
// console.log('cc.TempInputUpdater🔸🔸 ', cc.TempInputUpdater);

// console.log("number Of Regex🔸🔸 :", cc.numberOfRegex);