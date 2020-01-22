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
        Medium: {
            //DENVER
            Denver: {
                First: '01DEN',
                Second: '02DEN'
            },
            //SUWANEE
            Suwanee: {
                First: '01SWN',
                Second: '02SWN',
            }
        },
    },

    ClusterNumbers: {
        Denver: '1',
        Suwanee: '1'
    },

    DnsRevertEnd: '.VMCE.WESTIPC.COM.',
    DnsToIPEnd: '.VMCE'
}
