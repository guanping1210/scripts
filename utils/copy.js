// @ts-nocheck
const fs = require('fs-extra')
const { ncp } = require( 'ncp') // 新建文件夹、复制文件
const chalk = require( 'chalk') // 彩色信息

const { appDirectory } = require('../config')
const scriptsPath = appDirectory
const templatePath = `${appDirectory}/template`
// const templateLibPath = `${templatePath}/react-mfe-main/lib`

// 清空模板下的template lib
const deleteTemplateLib = (path) => {
    fs.emptyDirSync(path)
}

// 需要拷贝的文件
const needCopyFile = [
    'bin', 'scripts', 'src', 'config.js', '.babelrc', 'package.json', 'yarn.lock'
]

// 需要添加scripts源码的模板项目
const addLibTemplate = [
    'react-mfe-main',
    'react-mfe-sub',
    'vue-mfe-main',
    'vue-mfe-sub'
]

// 复制scripts的源码给template/lib
const cloneScripts = () => {
    addLibTemplate.forEach(template => {
        const templateLibPath = `${templatePath}/${template}/lib`
        deleteTemplateLib(templateLibPath)

        needCopyFile.forEach(file => {
            ncp(`${scriptsPath}/${file}`, `${templateLibPath}/${file}`, function(err) {
                if(err) {
                    return console.error(err)
                }
        
                console.log(chalk.yellow(`${template}/${file}复制完成`))
            })
        })
    })
}

cloneScripts()