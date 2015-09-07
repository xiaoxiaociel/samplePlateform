{%extends file="./layout.tpl"%}

{%block name="block_assign"%}
    {%$language="zh-CN" scope="global"%}
{%/block%}

{%*head title*%}
{%block name="block_head_js" append%}
    {%script%}
    {%/script%}
{%/block%}

{%*body main*%}
{%block name="block_content"%}
    <div id="main" class="wrapper">
    </div>
{%/block%}

{%* 底部js区域 *%}
{%block name="block_foot_js"%}
<script src='/static/js/lib/ajaxfileupload.js'></script>
{%/block%}

{%*init app*%}
{%block name="block_logic_js"%}
    {%script%}
        if( !(window.ActiveXObject && navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1] && parseInt(navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1])<7)){  
            require.async(["samplemis:widget/ui/app/viewprocessapp.js"],function(app){
                app.init();
            });
        }else{
            alert('为确保有更好的浏览体验，请升级浏览器~');
            location.href = 'http://windows.microsoft.com/zh-CN/internet-explorer/download-ie';
        }
    {%/script%}
{%/block%}
