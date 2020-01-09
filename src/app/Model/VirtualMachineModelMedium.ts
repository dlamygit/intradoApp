import { VirtualMachineModel } from './VirtualMachineModel'
import { VirtualMachine } from './VirtualMachine'

export class VirtualMachineModelMedium extends VirtualMachineModel {
    cMprimaryPublisher: VirtualMachine;
    cMPrimarySubscriber: VirtualMachine;
    cMSecondarySubscriber: VirtualMachine;
    iMPPrimarySubscriber: VirtualMachine;
    iMPSecondarySubscriber: VirtualMachine;
    cUCxPrimarySubscriber: VirtualMachine;
    cucxSecondaryPrimary: VirtualMachine;
}