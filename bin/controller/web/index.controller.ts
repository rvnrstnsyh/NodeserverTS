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

import * as logger from '@helpers/utils/logger'

import assets from '@root/client/assets'
import csrfProtection from '@middleware/csrf.middleware'
import controllerIFC from '@helpers/interfaces/controller.interface'

import { Router, Request, Response, NextFunction } from 'express'

/**
 *  !-- INDEX CONTROLLER (class)
 *
 * @desc web endpoint|controller|handler.
 * authentication, authorization, verification and validation .etc
 */
class IndexController implements controllerIFC {
  //
  public path: string = ''
  public router: Router = Router()

  private ctx: string = 'index:controller'

  constructor() {
    //
    this.endpoints()
  }

  /**
   *  !-- INDEX ENDPOINT (procedure)
   *
   * @desc defines endpoints, middleware, and controller paths.
   * @return void
   */
  private endpoints(): void {
    //
    this.router.get(`/`, [csrfProtection], this.sign_in)
  }

  /**
   *  !-- INDEX CONTROLLER - SIGN IN (procedure)
   *
   * @desc sign in handler.
   * @return promise void
   */
  private sign_in = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    //
    return response
      .status(200)
      .render("sign_in", {
        csrfToken: request.csrfToken(),
        layout: "../layouts/indexssr",
        assets: assets
      });

  }
}

export default IndexController
