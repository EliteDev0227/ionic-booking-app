import * as factory from './factory';
import {parseError} from './../../../../../helpers';

const weatherController = {};

weatherController.default = function(req, res, next) {
    res.sendStatus(404);
};

weatherController.get = async function(req, res, next) {

    try {

        let results = await factory.get(req.query);
        let rez = {};
        Object.keys(results).map(elem => {
            // keep the values that should be translated into the translate array
            if(elem === 'translate') return;
                
            // translate the marked element
            if( results['translate'].find(searchElem => elem == searchElem))
                rez[elem] =  res.__(...results[elem]);
            else
                rez[elem] =  results[elem];
        });
    
        res.status(200).json(rez);
        
    } catch (error) {

        let _error = parseError(error);

        _error.message = res.__(_error.message);

        let {status, code, message} = _error;

        res.status(code).json({status, code, message});
        
    }

};

export default weatherController;