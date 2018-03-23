
var calc = calc || {};

// Display viitab nuppude kohal asuvale input type="text" sisendile.
// Display objekt defineerib funktsioonid, mida kalkulaator teha oskab
calc.Display = function () {
    var $displayControl,
        operator,
        operatorSet = false,
        equalsPressed = false,
        accumulator = null,

        add = function (x, y) {
            return x + y;
        },

        divide = function (x, y) {
            if (y == 0) {
                alert("Can't divide by 0");
                return 0;
            }

            return x / y;
        },

        multiply = function (x, y) {
            return x * y;
        },

        subtract = function (x, y) {
            return x - y;
        },

        // See funktsioon akumuleerib väärtuse ning koos hetkel aktiivse numbriga 
        // sooritab soovitud arvutuse
        calculate = function () {
            // Kui midagi pole sisestatud, jäta ülejäänu vahele
            if (!operator || accumulator == null) 
                return;

            // Parsi sisestatud tekst aktiivseks numbriks 
            var currNumber = parseFloat($displayControl.value),
                newVal = 0;

            switch (operator) {
                case "+":
                    newVal = add(accumulator, currNumber);
                    break;
                case "-":
                    newVal = subtract(accumulator, currNumber);
                    break;
                case "*":
                    newVal = multiply(accumulator, currNumber);
                    break;
                case "/":
                    newVal = divide(accumulator, currNumber);
                    break;
                case "%":
                    newVal = currNumber / 100;
                    break;
                case "+/-":
                    newVal = -currNumber;
                    break;
            }
            setValue(newVal);
            accumulator = newVal;
        },

        setValue = function (val) {
            $displayControl.value = val;
        },

        getValue = function () {
            return $displayControl.value + "";
        },

        // Eemaldab kõik kuvatavad numbrid
        clearDisplay = function () {
            accumulator = null;
            equalsPressed = operatorSet = false;
            setValue("0");
        },

        // Eemaldab display-le kuvatud viimase väärtuse
        clearError = function () {
            var display = getValue();

            // kui string on kehtiv, eemaldame kõige parempoolse märgi 
            // NB!: selleks, et olla kehtiv, peab olema number ja mingi pikkusega 
            if (display) {
                display = display.slice(0, display.length - 1);
                display = display ? display : "0";
                setValue(display);
            }
        },

        // Haldab arvu või komakoha punkti lisamise 
        enterDigit = function (buttonValue) {
            var currentlyDisplayed = $displayControl.value;
            
            // Hoiame sisestatud arvude hulga mõistuse piires 
            if (currentlyDisplayed.length < 20) {
                if (operatorSet == true || currentlyDisplayed === "0") {
                    setValue("");
                    operatorSet = false;
                }
                
               // Kui juba vajutasime komakoha jaoks punkti 
                if (buttonValue === "." && currentlyDisplayed.indexOf(".") >= 0) {
                    return;
                }
                
                setValue($displayControl.value + buttonValue);
            }
        },

        setPercent = function(){
            var currentlyDisplayed = $displayControl.value;

            if(currentlyDisplayed) {
                setValue(currentlyDisplayed / 100);
            }
        },

        reverseSign = function(){
            var currentlyDisplayed = $displayControl.value;

            if(currentlyDisplayed) {
                setValue(-currentlyDisplayed);
            }
        },

        setOperator = function (newOperator) {
            if (newOperator === "=") {
                equalsPressed = true;
                calculate();
                return;
            }

            if (!equalsPressed) 
                calculate();

            equalsPressed = false;
            operator = newOperator;
            operatorSet = true;
            accumulator = parseFloat($displayControl.value);
        },

        // Salvestame viite HTML elemendile, mis teksti kuvab 
        init = function (currNumber) {
            $displayControl = currNumber;
        };

   // Kõik järgnevad funktsioonid on avalikud („public“)
    return {
        clearDisplay: clearDisplay,
        clearError: clearError,
        enterDigit: enterDigit,
        setOperator: setOperator,
        setPercent: setPercent,
        reverseSign: reverseSign,
        init: init
    };
}();

// Kalkulaatori peamine konstruktor-funktsioon 
calc.calculator = function () {
    
    // Initsialiseerib calc objekti sees oleva Display objekti ning salvestab viite
    // testi sisestusväljale. Lisaks tagastab seal kuvatava algse väärtuse
    calc.Display.init($("#displayPanel")[0]);
    
    // Iga "key" klassi kuuluva HTML elemendi jaoks lisame "touchstart" 
    // ja "click" sündmuste haldurid
    $(".key").on('touchstart click', function (event) {
        
        // Vaatame, mis väärtuse sellel nupul oli ning jätame meelde ka tema id 
        var key = $(this).attr("data-calc-tag"),
            id = this.id;

        console.log("Setting " + id + " with value "+ key);
        
        // Jõudluse tõstmiseks väldime vaikimisi sündmuse halduri välja kutsumist
        // ja sündmuse edasi saatmist (kuna me juba haldame seda). See väldib ka 
        // seda, et „touchstart“ põhjustaks „click“ sündmuse tõstatamise
        event.preventDefault();
        event.stopPropagation();

        switch (id) {
            case "key0":
            case "key1":
            case "key2":
            case "key3":
            case "key4":
            case "key5":
            case "key6":
            case "key7":
            case "key8":
            case "key9":
            case "keyDecimalPoint":
                calc.Display.enterDigit(key);
                break;
            case "keyC":
                calc.Display.clearDisplay();
                break;
            case "keyCe":
                calc.Display.clearError();
                break;
            case "keyAdd":
                calc.Display.setOperator("+");
                break;
            case "keySubtract":
                calc.Display.setOperator("-");
                break;
            case "keyMultiply":
                calc.Display.setOperator("*");
                break;
            case "keyDivide":
                calc.Display.setOperator("/");
                break;
            case "keyEquals":
                calc.Display.setOperator("=");
                break;
            case "keyPercent":
                calc.Display.setPercent();
                break;
            case "keyPlusMinus":
                calc.Display.reverseSign();
                break;
        }

        return false;
    });
};
