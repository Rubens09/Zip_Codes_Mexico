const { Router } = require('express');
const router = Router();

const cat_state = require('../cat_state.json');
const det_state = require('../det_state.json');

router.get('/',(req,res) => {
    let id_state="";
    var data_erro={mensaje:"Error en la búsqueda"};
    var data_res;
    if(req.body.zip_code){
        for(let x=0;x<cat_state.length;x++){
            for(let y=0;y<(cat_state[x].indication).length;y++){
                if(cat_state[x].indication[y]==(req.body.zip_code).substring(0,2)){
                    id_state=cat_state[x].id_state;
                    break;
                }
            }
            if(id_state!=""){
                let aux=0;
                let search_limit=3;
                for(let a=0;a<det_state.length;a++){
                    if(aux<search_limit){
                        if(det_state[a].id_state==id_state){
                            for(let b=0;b<(det_state[a].listado).length;b++){
                                if(det_state[a].listado[b].zip_code==req.body.zip_code){
                                    if(!data_res){
                                        data_res={"id_state":det_state[a].id_state,"state":det_state[a].state,"suburbs":[]};
                                    }
                                    data_res.suburbs.push(det_state[a].listado[b]);
                                }
                                else{
                                    if(b==((det_state[a].listado).length)-1){
                                        if(!data_res){
                                            data_erro={"id_state":det_state[a].id_state,"state":det_state[a].state,"mensaje":"Error, no se ha encontrado el municipio/colonia/fraccionamiento/delegación."};
                                        }
                                    }
                                }
                            }
                            break;
                        }
                        else{
                            if(data_res)
                            aux++;
                        }
                    }
                    else{
                        break;
                    }
                }
                break;
            }
            else{
                data_erro.mensaje="Error, no se ha encontrado el estado, estado y suburbio.";
            }
        }
    }
    else{
        data_erro={mensaje:"Error en la búsqueda, ingresa un parámetro correcto."};
    }
    res.json(data_res?data_res:data_erro);
});

module.exports = router;