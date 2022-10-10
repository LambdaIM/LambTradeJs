import chai from 'chai'
import sdk from '../contactLogic/index'
import {ethers,utils} from 'ethers'
var assert = chai.assert;  
import MinterSetPrice from './MinterSetPrice.json'
import Alleria from './Alleria.json'
import {OrdersParameter} from '../contactLogic/SellOrder'

describe("sdk",function(){
    let testconfig = require("./testconfig.json")

    let  MAKER_WALLET = new ethers.Wallet(testconfig.PRIVATE_KEY);
    let jsonurl =testconfig.rpcurl;
    let  RpcProvider =new ethers.providers.JsonRpcProvider(jsonurl)
    MAKER_WALLET=MAKER_WALLET.connect( RpcProvider)

    let  MAKER_WALLET_sub = new ethers.Wallet(testconfig.SUB_PRIVATE_KEY);
    MAKER_WALLET_sub=MAKER_WALLET_sub.connect( RpcProvider)

    let account = MAKER_WALLET.address
    console.log('account',account)
    let sub_account = MAKER_WALLET_sub.address;
    console.log('subaccount',sub_account)

    let Signer = MAKER_WALLET

    let SDK = new sdk(MAKER_WALLET,account,testconfig.chianid)
    let subSDK = new sdk(MAKER_WALLET_sub,sub_account,testconfig.chianid)

    let nftaddress = '0x394db89002043aBB7f979CBb82c492f01372C4EF'
    let tokenID="";
    let tokenID2=""
    let nftContract;
    let tokenID3="";
    let tokenID4="";

    before( async function () {
        // runs once before the first test in this block
        // mint nft

    let nftmintaddress = '0x6a20C503EC4EA2646aBd56E8607a7CAeEF8a1178';
    let Contract = new ethers.Contract(nftmintaddress,MinterSetPrice.abi,Signer)
     nftContract = new ethers.Contract(nftaddress,Alleria,Signer)

    let projectId = '1';
    let value =utils.parseUnits('30') 
    value = value.toString()
        
    let res = await Contract.purchase(projectId,{value:value})

   
    let res2 = await Contract.purchase(projectId,{value:value})

    

    let res3 = await Contract.purchase(projectId,{value:value})

    

    let res4 = await Contract.purchase(projectId,{value:value})

    
    let res5 = await Contract.purchase(projectId,{value:value})

    await res5.wait([1])

    const num = await nftContract.balanceOf(account);
    let data=[]

    for (let index = 0; index < num.toNumber(); index++) {
        let token = await nftContract.tokenOfOwnerByIndex(account, index)
        data.push(token.toNumber())
    }

    console.log(data)
    tokenID=data[data.length-1];
    console.log('tokenID',tokenID)
    tokenID2 = data[data.length-2]
    tokenID3 = data[data.length-3]
    tokenID4 = data[data.length-4]



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
            let tx =  await SDK.SellOrder.setApprovalForModule()
            await tx.wait([1])
            let tx2 =   await SDK.SellOrder.setApprovalForHelper(nftaddress)
            await tx2.wait([1])
         })
         it("after setapprove checkapprove",async function(){
            let isapprove = await SDK.SellOrder.checkApprovalForModule()
            console.log(isapprove)
            assert.equal(isapprove,true,'isapprove')
            let isnftapprove = await SDK.SellOrder.checkApprovalForHelper(nftaddress)
            assert.equal(isnftapprove,true,'isnftapprove')
        })
        it("create sell order ",async function(){
            let value =utils.parseUnits('1') 
            let res = await SDK.SellOrder.createOrder(nftaddress,tokenID,value)
            await res.wait([1])
            let order  = await SDK.SellOrder.getOrder(nftaddress,tokenID)
            let askPrice = order.askPrice.toString();
            let seller = order.seller;
            let askCurrency = order.askCurrency;

            assert.equal(askPrice,value,'askPrice')
            assert.equal(seller,account,'seller')
            assert.equal(askCurrency,"0x0000000000000000000000000000000000000000","askCurrency")
        })
        it("fill sell order",async function(){
            const num = await nftContract.balanceOf(account);
            let res = await subSDK.SellOrder.fillOrder(nftaddress,tokenID)
            await res.wait([1])
            const num2 = await nftContract.balanceOf(account);
            
            assert.equal(num-num2,1,'fill nft')
            let order  = await SDK.SellOrder.getOrder(nftaddress,tokenID)
            
            assert.equal(order.seller,"0x0000000000000000000000000000000000000000",'askPrice')
        })

        it("cancel sell order  ",async function(){
            let value =utils.parseUnits('1') 
            let res = await SDK.SellOrder.createOrder(nftaddress,tokenID2,value)
            await res.wait([1])
            let res2 = await SDK.SellOrder.cancelOrder(nftaddress,tokenID2);
            await res2.wait([1])
            let order  = await SDK.SellOrder.getOrder(nftaddress,tokenID2)
            assert.equal(order.seller,"0x0000000000000000000000000000000000000000",'askPrice')

        })

        it("create orders and fill orders ", async function(){
            //tokenID3 tokenID4
            let value  =  utils.parseUnits('1') ;
            let value2 = utils.parseUnits('2')  ;
    
            
            value  = value.toString();
            value2 = value2.toString();
    
            let pra = new OrdersParameter()
            pra.add(nftaddress,tokenID3,value)
            pra.add(nftaddress,tokenID4,value2)
    
            let res = await SDK.SellOrder.createOrders(pra)
            await res.wait([1])

            let order3  = await SDK.SellOrder.getOrder(nftaddress,tokenID3)
            let order4  = await SDK.SellOrder.getOrder(nftaddress,tokenID4)

            assert.notEqual(order3.seller,"0x0000000000000000000000000000000000000000",'create orders1 ')
            assert.notEqual(order4.seller,"0x0000000000000000000000000000000000000000",'create orders2 ')

            let resfill = await subSDK.SellOrder.fillOrders(pra);
            await resfill.wait([1]);

             order3  = await SDK.SellOrder.getOrder(nftaddress,tokenID3)
             order4  = await SDK.SellOrder.getOrder(nftaddress,tokenID4)

            assert.equal(order3.seller,"0x0000000000000000000000000000000000000000",'create orders1 ')
            assert.equal(order4.seller,"0x0000000000000000000000000000000000000000",'create orders2 ')


    
        })







    })
    after(async function () {
        // runs once after the last test in this block
        // set apprrove to false 
       let tx1 = await SDK.SellOrder.cancelApprovalForModule()
       await tx1.wait([1])
       let tx2 =  await SDK.SellOrder.cancelApprovalForHelper(nftaddress)
       await tx2.wait([1])

    });


})