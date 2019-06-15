/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for Swastha-blockchain', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Swastha-blockchain', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Swastha-blockchain');
    })
  });

  it('network-name should be swastha-blockchain@0.0.2-deploy.5',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('swastha-blockchain@0.0.2-deploy.5.bna');
    });
  });

  it('navbar-brand should be Swastha-blockchain',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('Swastha-blockchain');
    });
  });

  
    it('medicine component should be loadable',() => {
      page.navigateTo('/medicine');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('medicine');
      });
    });

    it('medicine table should have 7 columns',() => {
      page.navigateTo('/medicine');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('box component should be loadable',() => {
      page.navigateTo('/box');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('box');
      });
    });

    it('box table should have 12 columns',() => {
      page.navigateTo('/box');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('shipment component should be loadable',() => {
      page.navigateTo('/shipment');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('shipment');
      });
    });

    it('shipment table should have 6 columns',() => {
      page.navigateTo('/shipment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('contract component should be loadable',() => {
      page.navigateTo('/contract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('contract');
      });
    });

    it('contract table should have 9 columns',() => {
      page.navigateTo('/contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('manufacturer component should be loadable',() => {
      page.navigateTo('/manufacturer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('manufacturer');
      });
    });

    it('manufacturer table should have 5 columns',() => {
      page.navigateTo('/manufacturer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('distributor component should be loadable',() => {
      page.navigateTo('/distributor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('distributor');
      });
    });

    it('distributor table should have 5 columns',() => {
      page.navigateTo('/distributor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('customer component should be loadable',() => {
      page.navigateTo('/customer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('customer');
      });
    });

    it('customer table should have 5 columns',() => {
      page.navigateTo('/customer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('transporter component should be loadable',() => {
      page.navigateTo('/transporter');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transporter');
      });
    });

    it('transporter table should have 5 columns',() => {
      page.navigateTo('/transporter');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('regulators component should be loadable',() => {
      page.navigateTo('/regulators');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('regulators');
      });
    });

    it('regulators table should have 5 columns',() => {
      page.navigateTo('/regulators');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('updateShipment component should be loadable',() => {
      page.navigateTo('/updateShipment');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateShipment');
      });
    });
  
    it('createContract component should be loadable',() => {
      page.navigateTo('/createContract');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createContract');
      });
    });
  
    it('createBox component should be loadable',() => {
      page.navigateTo('/createBox');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createBox');
      });
    });
  
    it('createShipment component should be loadable',() => {
      page.navigateTo('/createShipment');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createShipment');
      });
    });
  
    it('updateContract component should be loadable',() => {
      page.navigateTo('/updateContract');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateContract');
      });
    });
  
    it('createMedicine component should be loadable',() => {
      page.navigateTo('/createMedicine');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createMedicine');
      });
    });
  
    it('deleteShipment component should be loadable',() => {
      page.navigateTo('/deleteShipment');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('deleteShipment');
      });
    });
  
    it('updateShipmentStatus component should be loadable',() => {
      page.navigateTo('/updateShipmentStatus');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateShipmentStatus');
      });
    });
  
    it('updateBox component should be loadable',() => {
      page.navigateTo('/updateBox');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateBox');
      });
    });
  
    it('updateBoxStatus component should be loadable',() => {
      page.navigateTo('/updateBoxStatus');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateBoxStatus');
      });
    });
  
    it('updateMedicine component should be loadable',() => {
      page.navigateTo('/updateMedicine');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('updateMedicine');
      });
    });
  

});