# stellertoken-nodejs

## Endpoints

### 1)  CreateAccount 

#### URL : http://localhost:3000/createAccount
#### Method : GET
#### output : private and pubic key 

### Example : 

{"pubicKey":"GD6IHBX2LJCMJB2IKCLOMQC6ZBZBMK3BMHHVGADGVR6RNQW2AYGEKGYA","privateKey":"SDNVZAT3ANK3D6EHD7STOMFC7BVPLG7BPXNAQLF4CMYAMQZB4VL2TAHT"}

### 2)  Check balance 

#### URL : http://localhost:3000/getbalance?accountId=GCRWLMPDJIIY6XJDVW3LD6MWNAMVJJHAYKCULG3SVDPF5DNWGZO6ZYOB
#### Method : GET
#### output : Token Balance

### Example : 

{"TokenName":"IGP","Balance":"200.0000000"}


### 3)  Transfer Token

#### URL : http://localhost:3000/transfertoken
#### Method : POST
#### Parameter :{
	"tokenName": "IGP",
	"tokenAmount": 10,
	"sourceAccount": "SAB6AZ6XJ3WP5USBDYI2DMWUMNHDAG6KQALSECOPVLRE7LEBTKBE33KP",
	"receiverAccount":"SDP2WU5DPF2P2KRYHQD22KDFV2ON5FJV4RGVKWSWZYI2Q4HXFUOWFKIJ"
}

#### output : Check logs







