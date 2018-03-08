/**
 * Created by Ryo Mikami on 2018/03/08.
 */
"use strict";
import React, {Component} from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * pdfmakeを使うにあたっての注意
 * npm installでnode_modules生成後、node_modules内のpdfmake→build→vfs_fonts.jsを入れ替えないとエラーが出る
 * もしくはpdfmakeのgithubからリポジトリを落として作成する必要性あり
 */

const PrintButton = () =>{
   const print =e =>{
        const array = this.props;
        e.preventDefault()//submitの効果を打ち消す
        pdfMake.fonts = {
            ipa:{
                normal:'ipaexg.ttf'//pdfmakeのvfs_fonts.jsで定義
            }
        };
        const defaultStyle = 'ipa';
        const docDefinition = {
            content: [
                {
                    text: '出張申請書',
                    style: 'header'
                },
                {
                    style: 'table',
                    table: {
                        headerRows: 1,
                        widths: [ 50, 'auto'],

                        body: [
                            [ '申請日', {text: year+'年 '+month+'月'+day+'日　('+yobi[week]+'曜日)'}],
                            [ '所属', belong ? {text:belong} : {text:''}],
                            [ '氏名', name ? {text:name} : {text:''}]
                        ]
                    }
                },
                {
                    style:'table',
                    table: {
                        headerRows: 1,
                        widths: [ 50, 410],
                        heights: [20, 30,0, 20,100,100],
                        body: [
                            [ {style:'word',text:'出張先'},{style:'word',text:destination,fontSize:20}],
                            [{text:'日程',rowSpan:2,margin:[0,10,0,0]}, {rowSpan: 2,text:will_stay_from[0]+'年'+will_stay_from[1]+'月'+time_from[0]+'日'+time_from[1]+'時　から\n'+will_stay_to[0]+'年'+will_stay_to[1]+'月'+time_to[0]+'日'+time_to[1]+'時　まで',alignment: 'center',margin:[0,5,0,0]}],
                            [{}, {}],
                            [{margin:[0,5,0,0],text:'目的'}, purpose ? {margin:[0,5,0,0],fontSize:20,text:purpose} : {text:''}],
                            [{margin:[0,45,0,0],text:'詳細'}, purpose_detail ? {margin:[0,5,0,0],alignment: 'left',text:purpose_detail} : {text:''}],
                            [{margin:[0,15,0,0],text:'備考'}, remark ? {margin:[0,5,0,0],alignment: 'left',text:remark} : {text:''}],
                        ]
                    }
                },
                {
                    /**
                     * 承認印
                     */
                    style:'table2',
                    table: {
                        headerRows: 1,
                        widths: [ 50, 50,50],
                        heights: [20, 20, 50],
                        body: [
                            [ {margin:[0,2,0,0],text:'承認印',colSpan: 3,alignment: 'center',fontSize:18},{},{}],
                            [ {style:'word2',text:'理事長'},{style:'word2',text:'担当理事'},{style:'word2',text:'上司'}],
                            [ president_approval === true ? {margin:[0,10,0,0],fontSize:25,text:'OK'} : {text:''}, {},superior_approval === true ? {margin:[0,10,0,0],fontSize:25,text:'OK'} : {text:''}],
                        ]
                    }
                },
            ],
            defaultStyle: {
                font: defaultStyle,
            },
            styles: {
                header: {
                    fontSize: 30,
                    alignment: 'center'
                },
                table:{
                    fontSize: 14,
                    marginTop: 20,
                    marginLeft: 50,
                    alignment: 'center'
                },
                table2:{//承認印のstyle
                    fontSize: 12,
                    marginTop: 30,
                    marginLeft: 350,
                    alignment: 'center'

                },
                word:{
                    margin:[0, 5, 0, 0]
                },
                word2:{
                    margin:[0, 5, 0, 0]
                }
                // subheader: {
                //     fontSize: 20,
                // },
            },
        };

        pdfMake.createPdf(docDefinition).open();
    }
        return (
            <button onClick={print}>印刷</button>
        )
}

export default PrintButton;