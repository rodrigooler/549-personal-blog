$(document).ready( function () {
} );
var contractAddress = '0x8a1f607C5317c49f0Aa45E695De9727BA9C72C81';
var ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_isVisible",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creationTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lastUpdateTime",
				"type": "uint256"
			}
		],
		"name": "logHash",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isVisible",
				"type": "bool"
			}
		],
		"name": "registerHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "postIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "blogName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isVisible",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "creationTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastUpdateTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getStruct",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isVisible",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "creationTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastUpdateTime",
						"type": "uint256"
					}
				],
				"internalType": "struct DocRegisterHash.Post",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var DocRegisterHash;

async function initializeEth(){
    // if (window.ethereum) {
    //     window.web3 = new Web3(ethereum);
    //     try {
    //         // Request account access if needed
    //         console.log("ethereum injected on web browser");
    //         await ethereum.enable();
    //     } catch (error) {
    //         // User denied account access...
    //     }
    // }
    // // else if (typeof web3 !== 'undefined') {
    // else if (window.web3) {
    //     web3 = new Web3(web3.currentProvider);
    //     console.log("web3 injected on web browser");
    // } 
    // else {
    //     // set the provider you want from Web3.providers
    //     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // using ganache-cli
    //     web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/980438a182dd4089ab8189d6aa01b881")); // using infura
    //     console.log("web3 using local connection");
    // }  
    web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/980438a182dd4089ab8189d6aa01b881")); // using infura
    web3.eth.defaultAccount = web3.eth.accounts[0];  
    DocRegisterHash = new web3.eth.Contract( ABI, contractAddress );
}

async function listAllPosts(){
    

    await DocRegisterHash.methods.totalPosts().call()
    .then(total => {
        var html = '';
        for (var i=total; i>=1; i--){
            var newHtml = new Promise ((resolve, reject) => {
                DocRegisterHash.methods.getPost(i).call()
                .then( result => {
                    //console.log(result);
                    if (result['_isVisible'] == true){
                      resolve({'index':result['_index'], 'ipfsHash':result['_ipfsHash'], 'title':result['_title'], 'creationTime':result['creationTime'], 'lastUpdateTime':result['lastUpdateTime']});
                    }
                })
            })
            newHtml.then((result) => {
                // md reader: https://ipfs.io/ipfs/QmVUFoAk2ZUxh12GXA2qLDHgTNzJgiZeZoaaM2s2pjgJxe
                var lastUpdateTime = new Date(result.lastUpdateTime * 1000).toLocaleDateString("en-GB");
                html += '<li><a target=_blank href="https://gateway.ipfs.io/ipfs/QmV3ew3hAqaQM8bWvS8dedWLWo4sF71sEVo3aoteLYyd1z#/ipfs/' + result.ipfsHash + '" class="list-group-item list-group-item-action">' + '[' + lastUpdateTime + '] ' + result.index + ': ' + result.title + '</a></li>'
                $("#arrayContent").html(html);
            });
            
        };

    })
}

initializeEth();
listAllPosts();
