export const BUILD_CONSTANTS = {
    SMALL_SIZE: 'Small',
    MEDIUM_SIZE: 'Medium',
    LARGE_SIZE: 'Large',
    EXTRA_LARGE_SIZE: 'Extra large',

    CUCM: 'CCM',
    PRESENCE: 'IMP',
    UNITY: 'CUC',

    PUBLISHER: 'P',
    SUBSCRIBER: 'S',

    ServerNumbers: {
        //DENVER
        Denver: {
            CCMPrimaryPublisher: '01DEN',
            CCMPrimarySubscriber: '01DEN',
            CCMSecondarySubscriber: '02DEN',
            IMPPrimarySubscriber: '01DEN',
            IMPSecondarySubscriber: '01DEN',
            CUCScondaryPublisher: '01DEN',
            CUCPrimarySubscriber: '01DEN'
        },
        //SUWANEE
        Suwanee: {
            CCMPrimaryPublisher: '01SWN',
            CCMPrimarySubscriber: '01SWN',
            CCMSecondarySubscriber: '02SWN',
            IMPPrimarySubscriber: '01SWN',
            IMPSecondarySubscriber: '01SWN',
            CUCScondaryPublisher: '01SWN',
            CUCPrimarySubscriber: '01SWN'
        }        
    },

    ClusterNumbers: {
        Denver: '1',
        Suwanee: '1'
    }
}
 