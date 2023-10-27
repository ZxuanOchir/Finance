// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {//private function
  var DOMStrings = {
    inputType : ".add__type", // inc or exp
    inputDescription : ".add__description", //desc
    inputValue : ".add__value", // value
    addBtn : ".add__btn",
    incomeList : ".income__list",
    expenseList : ".expenses__list",
    tusuvLabel : ".budget__value",
    incomeLabel : ".budget__income--value",
    expenseLabel : ".budget__expenses--value",
    percentageLabel : ".budget__expenses--percentage",
    containerDiv : ".container"
  };
  return{//public service
    getInput:function(){
      return{
        type: document.querySelector(DOMStrings.inputType).value,//===> finance ctrller
        description: document.querySelector(DOMStrings.inputDescription).value,
        value:parseInt(document.querySelector(DOMStrings.inputValue).value)
      };
    },
//public service
    getDOMStrings : function(){
      return DOMStrings;
    },

    clearFields : function(){
      var fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue
      );
      // Convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(el, index, array){//el=element index = index harulna 
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    tusviigUzuuleh : function(tusuv){//tusuv gej nerte obect shuuj avna gj uzy
      document.querySelector(DOMStrings.tusuvLabel).textContent = tusuv.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = tusuv.totalInc;
      document.querySelector(DOMStrings.expenseLabel).textContent = tusuv.totalExp;
      if(tusuv.huvi !== 0){
        document.querySelector(DOMStrings.percentageLabel).textContent = tusuv.huvi + '%';
      }
      else{
        document.querySelector(DOMStrings.percentageLabel).textContent = tusuv.huvi;
      }
    },

    deleteListItem : function(id){
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);//parentnode etseg element

    },

    addListItem : function(item,type){//item = finance controller Income Expense
      //орлого зарлага агуулсан html бэлтгэнэ.
      var html, list;
      
      if(type === 'inc'){
        list = DOMStrings.incomeList;
        html ='<div class="item clearfix" id="inc-$id$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$VALUE$</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }else{
        list = DOMStrings.expenseList;
        html ='<div class="item clearfix" id="exp-$id$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete">   <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //тэр хтмл дотроо зарлагын утгуудыг REPLACE хийж өгнө.

      html = html.replace('$id$', item.id);
      html = html.replace('$$DESCRIPTION$$', item.description);
      html = html.replace('$VALUE$', item.value);
      //Бэлтсэгэн html ээ DOM руу хийж өгнө.

      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
  };

})();

// Санхүү тэй ажиллах контроллер
var financeController = (function() {
  // private data
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
//private data
  var Expense = function(id , description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0)
    this.percentage = Math.round((this.value / totalIncome ) * 100);
  else this.percentage = 0;
  }

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  }

  var calculateTotal = function(type){
    var sum = 0;
    data.items[type].forEach(function(el){
      sum = sum + el.value;
    });

    data.totals[type] = sum;

  }
  // var i1 = new Income(1 , 'Цалин', 2500000);
  // var i2 = new Income(2 , 'Зээл авсан', 1500000);
//private data
var data = {
  items : {
    inc : [],
    exp : []
  },

  totals : {
    inc : 0,
    exp : 0
  },

  tusuv : 0,

  huvi: 0,
};

return { //data ruu nemj ugnu
  tusuvTootsooloh : function(){
    //нийт орлогын нийлбэрийг тооцоолно.
    calculateTotal("inc");

    //нийт зарлагийн нийлбэрийг тооцоолно.
    calculateTotal("exp"); 

    //төсөвийг шинээр тооцоолно.
    data.tusuv = data.totals.inc - data.totals.exp;

    //Орлого зарлагын хувь ийг тооцоолно.
    if(data.totals.inc > 0)
    data.huvi = Math.round((data.totals.exp / data.totals.inc) *100);
  },


  calculatePercentages : function(){
    data.items.exp.forEach(function(el){
      el.calcPercentage(data.totals.inc);
    });
  },

getPercentages : function(){
  var allPercentages = data.items.exp.map(function(el){
    return el.getPercentage;
  });

  return allPercentages;
},
  tusviigAvah :function(){//tusuv ui controller toi holbootoi.
    return {
      budget : data.tusuv,
      huvi : data.huvi,
      totalInc : data.totals.inc,
      totalExp : data.totals.exp
    };
  },

  deleteItem : function(type, id){
    var ids = data.items[type].map(function(el){
      return el.id;
    });

    console.log('ids :'+ ids);

    var index = ids.indexOf(id);

    console.log("index :" + index);

    if(index !== -1){
      console.log('ustah gjn');
      data.items[type].splice(index, 1);
    }

  },


  addItem : function(type, desc, val){
    var item, id;

    if(data.items[type].length === 0) id = 1;
    else{
      id = data.items[type][data.items[type].length - 1].id + 1;
      //length - 1 gedeg n niit element too -1 ni [type][0] hamgiin ehni element iig avna 
    }

    if(type === 'inc'){
      item = new Income(id, desc, val);
    }else{
      item = new Expense(id, desc, val);
    }

    data.items[type].push(item);

    return item;
  },

  seeData : function(){
    return data;
  }
};

})();

// Программын холбогч контроллер
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function(){
        //1.оруулах өгөгдөлийг дэлгэцээс олж авна.
        var input = uiController.getInput();

        if(input.description !== "" && input.value){
        //2. олж авсан санхүүгийн контроллерт дамжуулж авна.

        var item = financeController.addItem(input.type, input.description, input.value);

        //3. олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        uiController.addListItem(item, input.type);//delgetsend inc
        uiController.clearFields();


        //Төсвийг шинээр тооцоолж дэлгэцэнд үзүүлнэ.
        updateTusuv();
        }
       
  };
 var updateTusuv = function(){
    //4. төсвийг тооцоолно.
    financeController.tusuvTootsooloh();

    //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    var tusuv = financeController.tusviigAvah();

    //6. Төсвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuuleh(tusuv);

    //7.Элемэнтүүдийн хувьг тооцоолно.
    financeController.calculatePercentages();

    //8. Элемэнтүүдийн хувийг хүлээж авна.
    var allPercentages = financeController.getPercentages();
   //9. Эдгээр хувийг дэлгэцэнд гаргана.
    console.log();
};

var setupEventListeners = function(){

  var DOM = uiController.getDOMStrings();

  document.querySelector(DOM.addBtn).addEventListener("click",function(){
    ctrlAddItem();
  });

  document.addEventListener("keypress",function(event){
   if(event.keyCode === 13 || event.which === 13){
    ctrlAddItem();
   }
  });

  document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
    var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(id){
      // id = inc-2 or exp-3
      var arr = id.split("-");
      var type = arr[0];//"inc"
      var itemId = parseInt(arr[1]);//"2"

       console.log(type + '===> ' +itemId);

      //1. Санхүүгийн модулиас устгаж өгнө. type,id ashiglan
      financeController.deleteItem(type, itemId);
      //2. Delgets deeres ene elementiig ustagna.
      uiController.deleteListItem(id);//deed id gaas damjuulav.
      //3. Uldegdel tootsoog shinechilj haruulna.
              //Төсвийг шинээр тооцоолж дэлгэцэнд үзүүлнэ.
              updateTusuv();
    }
  });

};

  return {
    init : function(){
      console.log('Application started...');
      uiController.tusviigUzuuleh({
        tusuv : 0,
        huvi : 0,
        totalInc : 0,
        totalExp : 0
      });
      setupEventListeners();
    }
  }
})(uiController, financeController);

appController.init();
  