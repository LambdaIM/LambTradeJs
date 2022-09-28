
import SDK from '../contactLogic/index'
import { ethers,utils } from 'ethers';
import MinterSetPrice from './MinterSetPrice.json'
import Alleria from './Alleria.json'
import {OrdersParameter} from '../contactLogic/Sellorder' 


/**
 * 0x5694c26EC2eC66632743379FA1336b7aA1801F78
 * nft 测试合约
 * 
*/

async function main(){
    let ethersprovider = new ethers.providers.Web3Provider(window.ethereum);
    let accountOBJ = await window.ethereum.enable()
    let chianidOBJ = await  ethersprovider.getNetwork();
  
    console.log(chianidOBJ,accountOBJ)
    let chianid =chianidOBJ.chainId;
    let account = accountOBJ[0];
    let sdkobj = new SDK(window.ethereum,account,chianid)
    console.log(sdkobj)
    
    let Signer = ethersprovider.getSigner(account)
    let _address= await  Signer.getAddress();
    console.log('_address',_address)

    let nftmintaddress = '0x6a20C503EC4EA2646aBd56E8607a7CAeEF8a1178';
    let Contract = new ethers.Contract(nftmintaddress,MinterSetPrice.abi,Signer)
    let nftaddress = '0x394db89002043aBB7f979CBb82c492f01372C4EF'
    let nftContract = new ethers.Contract(nftaddress,Alleria,Signer)

    let tokenID ="1000009";

    document.querySelector("#setApprovalForModule").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.setApprovalForModule()
        console.log(res)

    })

    document.querySelector("#checkApprovalForModule").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.checkApprovalForModule()
        console.log(res)

    })

    document.querySelector("#setApprovalForHelper").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.setApprovalForHelper(nftaddress)
        console.log(res)
    })

    document.querySelector("#checkApprovalForHelper").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.checkApprovalForHelper(nftaddress)
        console.log(res)

    })

    document.querySelector("#mintnft").addEventListener('click',async function(){
        console.log('- - -')
        let projectId = '1';
        let value =utils.parseUnits('30') 
        value = value.toString()
        
        let res = await Contract.purchase(projectId,{value:value})


        console.log(res)

    })
    document.querySelector("#readnft").addEventListener('click',async function(){
        console.log('- - -')
        
        const num = await nftContract.balanceOf(account);
        let data=[]

        for (let index = 0; index < num.toNumber(); index++) {
           let token = await nftContract.tokenOfOwnerByIndex(account, index)
           data.push(token.toNumber())
        }

        console.log(data)

    })

    document.querySelector("#createOrder").addEventListener('click',async function(){
        console.log('- - -')
        let value =utils.parseUnits('1') 
        let res = await sdkobj.SellOrder.createOrder(nftaddress,tokenID,value)
        console.log(res)

    })

    document.querySelector("#getOrder").addEventListener('click',async function(){
        console.log('- - -')
        let value =utils.parseUnits('1') 
        let res = await sdkobj.SellOrder.getOrder(nftaddress,tokenID)
        console.log(res)

    })
    document.querySelector("#cancelorder").addEventListener('click',async function(){
        console.log('- - -')
        let value =utils.parseUnits('1') 
        let res = await sdkobj.SellOrder.cancelOrder(nftaddress,tokenID)
        console.log(res)

    })

    document.querySelector("#createOrders").addEventListener('click',async function(){
        console.log('- - -')
        let value  =  utils.parseUnits('1') ;
        let value2 = utils.parseUnits('2')  ;

        let tokenID2 ="1000007";
        value  = value.toString();
        value2 = value2.toString();

        // let list=[{
        //     nftAddress:nftaddress,tokenID,value
        // },{
        //     nftAddress:nftaddress,tokenID:tokenID2,value:value2
        // }]

        let pra = new OrdersParameter()
        pra.add(nftaddress,tokenID,value)
        pra.add(nftaddress,tokenID2,value2)

        let res = await sdkobj.SellOrder.createOrders(pra)
        console.log(res)


    })

    
    document.querySelector("#fillOrders").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.getOrder(nftaddress,tokenID)

        let value  =  utils.parseUnits('1') ;
        let value2 = utils.parseUnits('2')  ;

        let tokenID2 ="1000007";
        value  = value.toString();
        value2 = value2.toString();
        
        let pra = new OrdersParameter()
        pra.add(nftaddress,tokenID,value)
        pra.add(nftaddress,tokenID2,value2)
        
        let res2 = await sdkobj.SellOrder.fillOrders(pra)
        console.log(res2)

    })

    document.querySelector("#fillorder").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.getOrder(nftaddress,tokenID)

        let value  =  res.askPrice.toString() ;
        
        let res2 = await sdkobj.SellOrder.fillOrder(nftaddress,tokenID,value,res.askPrice.toString())
        console.log(res2)

    })

    document.querySelector("#setApprovalForModulebuy").addEventListener('click',async function(){
        console.log('- - -')
        // let res = await sdkobj.SellOrder.setApprovalForModule()
        let res = await sdkobj.BuyOrder.setApprovalForModule()
        console.log(res)

        
    })

    document.querySelector("#checkApprovalForModulebuy").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyOrder.checkApprovalForModule()
        console.log(res)
        
    })

    document.querySelector("#setApprovalForHelperbuy").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyOrder.setApprovalForHelper(nftaddress)
        console.log(res)
        
    })

    document.querySelector("#checkApprovalForHelperbuy").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyOrder.checkApprovalForHelper(nftaddress)
        console.log(res)
    })

    document.querySelector("#createOffer").addEventListener('click',async function(){
        console.log('- - -')
        let value  =  utils.parseUnits('22') ;
        value = value.toString()
        let res = await sdkobj.BuyOrder.createOffer(nftaddress,tokenID,value)


        console.log(res)
    })

    document.querySelector("#getOffer").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyOrder.getOffer(nftaddress,tokenID,2)


        console.log(res)
    })
    document.querySelector("#fillOffer").addEventListener('click',async function(){
        console.log('- - -')
        console.log(nftaddress,tokenID,1)
        let res = await sdkobj.BuyOrder.fillOffer(nftaddress,tokenID,2)


        console.log(res)
    })

    document.querySelector("#cancelorderbuy").addEventListener('click',async function(){
        console.log('- - -')
        console.log(nftaddress,tokenID,1)
        let res = await sdkobj.BuyOrder.cancelOffer(nftaddress,tokenID,1)
        console.log(res)

    })

    document.querySelector("#setApprovalForModuleCollection").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyCollectionOrder.setApprovalForModule()
        console.log(res)

    })

    document.querySelector("#checkApprovalForModuleCollection").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyCollectionOrder.checkApprovalForModule()
        console.log(res)
    })

    document.querySelector("#setApprovalForHelperCollection").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyCollectionOrder.setApprovalForHelper(nftaddress)
        console.log(res)
    })


    document.querySelector("#checkApprovalForHelperCollection").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.BuyCollectionOrder.checkApprovalForHelper(nftaddress)
        console.log(res)
    })

    document.querySelector("#createOfferCollection").addEventListener('click',async function(){
        console.log('- - -')
        let value  =  utils.parseUnits('22') ;
        let res = await sdkobj.BuyCollectionOrder.createOfferList(nftaddress,tokenID,value)
        console.log(res)
    })

    document.querySelector("#fillOfferCollection").addEventListener('click',async function(){
        console.log('- - -')
        let offerid=3;
        let res = await sdkobj.BuyCollectionOrder.fillOfferList(nftaddress,tokenID,offerid)
        console.log(res)
    })


    document.querySelector("#getOfferCollection").addEventListener('click',async function(){
        console.log('- - -')
        let offerid=1;
        let res = await sdkobj.BuyCollectionOrder.getOfferList(nftaddress,offerid)
        console.log(res)
        
    })

    document.querySelector("#cancelOfferCollection").addEventListener('click',async function(){
        console.log('- - -')
        let offerid=1;
        let res = await sdkobj.BuyCollectionOrder.cancelOfferList(nftaddress,offerid)
        console.log(res)
        
    })


    //cancelOfferCollection

    // cancelorderbuy

    //fillOffer
    //createOffer


    //fillorder

    //createOrders

    /***
     * /**
     * 读区余额
    async balanceOf(){
        const contract = this.getAlleriaContractRead();
        const info = await contract.balanceOf(this.account);
            return info
    }
    /**
     * 读区token列表
    async listToken(){
        let num = await this.balanceOf();
        
        const contract = this.getAlleriaContractRead();
        let data=[]

        for (let index = 0; index < num.toNumber(); index++) {
           let token = await contract.tokenOfOwnerByIndex(this.account, index)
           data.push(token)
        }   
        return data
    }
     * **/

    

    

    

    


    
}
 setTimeout(()=>{
    main();
},1000*5)