## bin命令练习

给这个包制作一个命令，叫q-cli。
1、新建bin文件夹，创建q-cli.js
2、#!/usr/bin/env node 这段话的意思是让使用 node 进行脚本的解释程序，那下面的就可以使用 node 的语法了
3、添加bin
好了，现在我们把bin需要的可执行js文件已经创建好，接下来需要在package.json中描述进去.
4、打成全局包
必须要打成全局包才可以使用该命令,打成全局包的命令
npm install . -g
或者
npm link

测试：在终端输入命令 b-bin 
可打印
q-cli执行
q-cli执行2