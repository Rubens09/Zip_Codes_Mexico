const { Router } = require('express');
const router = Router();

const det_state = require('../det_state.json');

router.get('/',(req,res) => {
    var data_erro={mensaje:"Error en la búsqueda"};
    var data_res;
    if((req.body.id_state||req.body.state)&&((req.body.suburb))){
        for(let x=0;x<det_state.length;x++){
            if(det_state[x].id_state==req.body.id_state)
                data_res=det_state[x];
            if(x==(det_state.length)-1)
            data_erro={mensaje:"Error en la búsqueda, estado no encontrado."};
        }
    }
    else if(req.body.state){
        for(let x=0;x<det_state.length;x++){
            if(det_state[x].state==req.body.state)
                data_res=det_state[x];
            if(x==(det_state.length)-1)
            data_erro={mensaje:"Error en la búsqueda, estado no encontrado."};
        }
    }
    else{
        data_erro={mensaje:"Error en la búsqueda, ingresa un parámetro correcto."};
    }
    res.json(data_res?data_res:data_erro);
});

module.exports = router;