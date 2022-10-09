import chai from 'chai'
import sdk from '../contactLogic/index'
import {ethers,utils} from 'ethers'
var assert = chai.assert;  
import MinterSetPrice from './MinterSetPrice.json'
import Alleria from './Alleria.json'

describe("sdk",function(){
    let testconfig = require("./testconfig.json")

    let  MAKER_WALLET = new ethers.Wallet(testconfig.PRIVATE_KEY);
    let jsonurl =testconfig.rpcurl;
    let  RpcProvider =new ethers.providers.JsonRpcProvider(jsonurl)
    MAKER_WALLET=MAKER_WALLET.connect( RpcProvider)

    let account = MAKER_WALLET.address
    console.log(account)
    let Signer = MAKER_WALLET

    let SDK = new sdk(MAKER_WALLET,account,testconfig.chianid)
    let nftaddress = '0x394db89002043aBB7f979CBb82c492f01372C4EF'
    let tokenID="";

    before( async function () {
        // runs once before the first test in this block
        // mint nft

    let nftmintaddress = '0x6a20C503EC4EA2646aBd56E8607a7CAeEF8a1178';
    let Contract = new ethers.Contract(nftmintaddress,MinterSetPrice.abi,Signer)
    let nftContract = new ethers.Contract(nftaddress,Alleria,Signer)

    let projectId = '1';
    let value =utils.parseUnits('30') 
    value = value.toString()
        
    let res = await Contract.purchase(projectId,{value:value})

    res.wait([0])

    const num = await nftContract.balanceOf(account);
    let data=[]

    for (let index = 0; index < num.toNumber(); index++) {
        let token = await nftContract.tokenOfOwnerByIndex(account, index)
        data.push(token.toNumber())
    }

    console.log(data)
    tokenID=data[data.length-1];


    });
    describe('sellorder',function(){
        it("checkapprove",async function(){
            let isapprove = await SDK.SellOrder.checkApprovalForModule()
            console.log(isapprove)
            assert.equal(isapprove,false)
            let isnftapprove = await SDK.SellOrder.checkApprovalForHelper(nftaddress)
            assert.equal(isnftapprove,false)
        })
         it("setapprove",async function(){
             await SDK.SellOrder.setApprovalForModule()
             await SDK.SellOrder.setApprovalForHelper(nftaddress)
         })
         it("after setapprove checkapprove",async function(){
            let isapprove = await SDK.SellOrder.checkApprovalForModule()
            console.log(isapprove)
            assert.equal(isapprove,true)
            let isnftapprove = await SDK.SellOrder.checkApprovalForHelper(nftaddress)
            assert.equal(isnftapprove,true)
        })



    })
    after(async function () {
        // runs once after the last test in this block
        // set apprrove to false 
        await SDK.SellOrder.cancelApprovalForModule()
        await SDK.SellOrder.cancelApprovalForHelper(nftaddress)

    });


})