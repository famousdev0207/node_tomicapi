import * as Jwt from 'jwt-simple';
import Promise from 'bluebird';
import * as utility from '../utility';
import config from '../../config';

//Create jwt
export function create(id) {

    let verify = utility.makeid(11);
    let key = `${id.toString()}:${verify}`;

    var token = Jwt.encode({
        _id: id,
        _verify: verify
    }, config.secret);

    return Promise.resolve({key, token});
}

//verify jwt
export function extract(token) {

    let decoded = Jwt.decode(token, config.secret, true);
    return Promise.resolve({id: decoded._id, key: `${decoded._id}:${decoded._verify}`});
}
