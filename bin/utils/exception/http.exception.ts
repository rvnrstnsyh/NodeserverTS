/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2022 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

/**
 *  !-- HTTP EXCEPTION (Class)
 *
 * @desc provides error messages and status codes.
 */
class HttpException extends Error {
    //
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        //
        super(message);

        this.status = status;
        this.message = message;
    }
}

export default HttpException;
