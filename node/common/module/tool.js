var obj = {
    get(){
        console.log('这是get方法')
    },
    set(){
        console.log('这是set')
    }
}
module.exports=obj
// 在Node模块中,采用的是commonjs规范,也就是使用require方式引入模块,而使用module.exports导出接口

// Es6中模块导出的基本语法，将export放在任何变量,函数或类声明的前面,从而将他们从模块导出,而import用于引入数据
