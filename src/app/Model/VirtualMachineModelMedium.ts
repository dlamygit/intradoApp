import { VirtualMachineModel } from './VirtualMachineModel'
import { VirtualMachine } from './VirtualMachine'

export class VirtualMachineModelMedium implements VirtualMachineModel {
    cmPrimaryPublisher: VirtualMachine; //CM Publisher primary datacenter
    cmPrimarySubscriber: VirtualMachine; //CM Subscriber primary datacenter
    cmSecondarySubscriber: VirtualMachine; //CM Subscriber secondary datacenter

    impPrimarySubscriber: VirtualMachine; //IM&P Subscriber primary datacenter
    impSecondarySubscriber: VirtualMachine; //IM&P Subscriber secondary datacenter

    cucxPrimarySubscriber: VirtualMachine; //CUCx Subscriber primary datacenter
    cucxSecondaryPublisher: VirtualMachine;  //CUCx Publisher secondary datacenter
    
    expePrimaryPublisher: VirtualMachine; //expressway Edge Publisher primary datacenter
    expcPrimarySubscriber: VirtualMachine; //expressway Core Subscriber primary datacenter
    expeSecondaryPublisher: VirtualMachine; //expressway Edge Publisher secondary datacenter
    expcSecondarySubscriber: VirtualMachine; //expressway Core Subscriber secondary datacenter

    getFirstVirtualMachine(): VirtualMachine {
        return this.cmPrimaryPublisher;
    }

    constructor() {
        this.cmPrimaryPublisher = new VirtualMachine();
        this.cmPrimarySubscriber = new VirtualMachine();
        this.cmSecondarySubscriber = new VirtualMachine();
        this.impPrimarySubscriber = new VirtualMachine();
        this.impSecondarySubscriber = new VirtualMachine();
        this.cucxPrimarySubscriber = new VirtualMachine();
        this.cucxSecondaryPublisher = new VirtualMachine();
        this.expePrimaryPublisher = new VirtualMachine();
        this.expcPrimarySubscriber = new VirtualMachine();
        this.expeSecondaryPublisher = new VirtualMachine();
        this.expcSecondarySubscriber = new VirtualMachine();
    }
}