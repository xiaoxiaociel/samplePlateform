var uploadfile = '/receiver.php';

var odp = '/home/img/local/odp';

fis.config.set('project.fileType.text', 'jsx'); //*.jsx files are text file.
fis.config.set('modules.parser.jsx', 'react');  //compile *.jsx with fis-parser-react plugin
fis.config.set('roadmap.ext.jsx', 'js'); //*.jsx are exactly treat as *.js

fis.config.merge({
    namespace : "samplemis",
    modules: {
        parser: {
            js: 'reactjs',
            tpl: 'reactsmarty'
        }
    },
    pack : {
        "samplemis.js" : [
            "widget/**.js"
        ],
        "samplemis.css" : [
            "widget/**.css",
            "widget/**.less"
        ]
    },
    deploy : {
            //使用fis release --dest remote来使用这个配置
        remote : [
            {
                //如果配置了receiver，fis会把文件逐个post到接收端上
                receiver : uploadfile,
                //从产出的结果的static目录下找文件
                from : '/template',
                subOnly : true,
                //保存到远端机器的/home/fis/www/static目录下
                //这个参数会跟随post请求一起发送
                to : odp + '/template',
                //某些后缀的文件不进行上传
                exclude : /.*\.(?:svn|cvs|tar|rar|psd|sh).*/
            },{
                //如果配置了receiver，fis会把文件逐个post到接收端上
                receiver : uploadfile,
                //从产出的结果的plugin目录下找文件
                from : '/plugin',
                //保存到远端机器的/home/fis/www/plugin目录下
                subOnly : true, 
                //这个参数会跟随post请求一起发送
                to : odp + '/smarty/baiduplugins/',
                //某些后缀的文件不进行上传
                exclude : /.*\.(?:svn|cvs|tar|rar|psd|sh).*/
            },            {
                //如果配置了receiver，fis会把文件逐个post到接收端上
                receiver : uploadfile,
                //从产出的结果的static目录下找文件
                from : '/static',
                //上传目录从static下一级开始不包括static目录
                subOnly : true, 
                //保存到远端机器的/home/fis/www/static目录下
                //这个参数会跟随post请求一起发送
                to : odp + '/webroot/static',
                //某些后缀的文件不进行上传
                exclude : /.*\.(?:svn|cvs|tar|rar|psd|sh).*/
            },
            {
                //如果配置了receiver，fis会把文件逐个post到接收端上
                receiver : uploadfile,
                //从产出的结果的config目录下找文件
                from : '/config',
                //保存到远端机器的/home/fis/www/config目录下
                subOnly : true, 
                //这个参数会跟随post请求一起发送
                to : odp + '/data/smarty/config',
                //某些后缀的文件不进行上传
                exclude : /.*\.(?:svn|cvs|tar|rar|psd|sh).*/
            }
        ]
    }
});
