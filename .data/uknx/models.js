const knxGroupRegex = new RegExp('\b([0-9]|[1]?[0-5]?)\/[0-7]\/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b');
const knxPhyRegex = new RegExp('\b([0-9]|[1]?[0-5]?)\/([0-9]|[1]?[0-5]?)\/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b');
const hexColorRegex = new RegExp('/^#(?:[0-9a-fA-F]{3}){1,2}$/');
const macRegex = new RegExp('/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/');

const sliderSchema = new SimpleSchema({ // Sub element for rangeSchema, not a collection itself!
    range_step: { // Steps between slider values
        type: Number,
        optional: true,
        defaultValue: 0
    },
    range_min: { // Minimum value selectable, converted according to DPT type
        type: Number,
        optional: true,
        defaultValue: 0
    },
    range_max: { // Maximum value selectable, converted according to DPT type
        type: Number,
        optional: true,
        defaultValue: 0
    }
});

const comboSchema = new SimpleSchema({ // Sub element for rangeSchema, not a collection itself!
    label: { // Display text
        type: String,
        optional: true
    },
    value: { // Value to send, converted according to DPT type
        type: Number,
        optional: true,
        defaultValue: 0
    }
});

const rangeSchema = new SimpleSchema({ // Sub element for Command or Menu Button, not a collection itself!
    model: { // Functional model
        type: String,
        optional: false,
        defaultValue: 'Absolute',
        // Absolute: Slider parameters applied. Write selected value directly, without modification
        // Differential: Slider parameters applied. Write requested value by offset from the current known value
        // Combo: Slider selects between label:value pairs
        allowedValues: ['Absolute', 'Differential', 'Combo']
    },
    address: { // KNX Group Address which will be written for selected value
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    dpt: { // Appropriate Data Point Type (DPT) for meaningful value conversion
        type: Number,
        optional: false,
        defaultValue: 0
    },
    fbenable: { // Enabling reading device's actual value
        type: Boolean,
        optional: false,
        defaultValue: false
    },
    fbaddress: { // KNX Group Address which will be read for actual value
        type: String,
        optional: true,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    secondaryfbenable: { // Enabling reading a second informational value
        type: Boolean,
        optional: false,
        defaultValue: false
    },
    secondaryfbaddress: { // KNX Group Address which will be read for actual value
        type: String,
        optional: true,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    slider: { // Slider parameters for absolute and differential types
        type: sliderSchema
    },
    combo: [{ // Slider selects between label:value pairs
        type: comboSchema
    }]
});

const CommandButtonSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    address: { // KNX Group Address which will be written for selected value
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    dpt: { // Appropriate Data Point Type (DPT) for meaningful value conversion
        type: Number,
        optional: false
    },
    value_h: { // Value To Send For Click Event When Highlighted
        type: Number,
        optional: false,
        defaultValue: 0
    },
    value_s: { // Value To Send For Click Event When Shaded
        type: Number,
        optional: false,
        defaultValue: 0
    },
    fbenable: { // Enabling reading device's actual value
        type: Boolean,
        optional: false,
        defaultValue: false
    },
    fbaddress: { // KNX Group Address which will be read for actual value
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    bgcolor: { // The peripheral icon is expected as transparent and background color will be selected value
        type: String,
        optional: false,
        regEx: hexColorRegex
    },
    bgimage: { // Icon visual
        type: String,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    },
    range: {
        type: rangeSchema // Nested Schema
    }
});

const MenuButtonSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    bgcolor: { // The peripheral icon is expected as transparent and background color will be selected value
        type: String,
        optional: false,
        regEx: hexColorRegex
    },
    bgimage: { // Icon visual
        type: String,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    },
    range: {
        type: rangeSchema  // Nested Schema
    },
    buttons: {
        type: CommandButtonSchema  // Nested Schema
    }
});

const LabelSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    label: { // Static or dynamically updated caption
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    address: { // KNX Group Address which will be written for selected value
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    dpt: { // Appropriate Data Point Type (DPT) for meaningful value conversion
        type: Number,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    }
});

const DetectorSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    address: { // KNX Group Address which will be written for selected value
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    dpt: { // Appropriate Data Point Type (DPT) for meaningful value conversion
        type: Number,
        optional: false
    },
    triggerval: { // Component will be triggered when this value received
        type: Number,
        optional: false,
        defaultValue: 0
    },
    delay: { // Delay in seconds, if zonetype is 'delayed'
        type: Number,
        optional: false,
        defaultValue: 0
    },
    message: { // Message to display to user when an alarm occurs
        type: String,
        optional: false
    },
    zonetype: { // Functional model
        type: String,
        optional: false,
        defaultValue: 'Instant',
        allowedValues: ['Instant', 'Delayed']
    },
    bgcolor: { // The peripheral icon is expected as transparent and background color will be selected value
        type: String,
        optional: false,
        regEx: hexColorRegex
    },
    bgimage: { // Icon visual
        type: String,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    }
});

const ChimeSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    address: { // KNX Group Address which will be triggered when trigger value received
        type: String,
        optional: false,
        defaultValue: '0/0/0',
        regEx: knxGroupRegex
    },
    dpt: { // Appropriate Data Point Type (DPT) for meaningful value conversion
        type: Number,
        optional: false
    },
    triggerval: { // Component will be triggered when this value received
        type: Number,
        optional: false,
        defaultValue: 0
    },
    ringtone: { // Ring tone
        type: String,
        optional: false
    },
    ringtimes: { // How many times the tone will be played
        type: Number,
        optional: false,
        defaultValue: 0
    },
    bgcolor: { // The peripheral icon is expected as transparent and background color will be selected value
        type: String,
        optional: false,
        regEx: hexColorRegex
    },
    bgimage: { // Icon visual
        type: String,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    }
});

const VideoSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    coordinate: { // X, Y coordinates on associated page
        type: String,
        optional: false
    },
    codec: {
        type: String,
        optional: false,
        defaultValue: 'MJPG',
        allowedValues: ['MJPG']
    },
    homeurl: {
        type: String,
        optional: false
    },
    remoteurl: {
        type: String,
        optional: false
    },
    username: {
        type: String,
        optional: false
    },
    password: {
        type: String,
        optional: false
    },
    bgcolor: { // The peripheral icon is expected as transparent and background color will be selected value
        type: String,
        optional: false,
        regEx: hexColorRegex
    },
    bgimage: { // Icon visual
        type: String,
        optional: false
    },
    visible: { // The peripheral is visible in user interfaces or not
        type: Boolean,
        optional: false,
        defaultValue: true
    }
});

const PageSchema = new SimpleSchema({
    name: { // Name for display purposes
        type: String,
        optional: false
    },
    orderindex: { // Ordering index among other pages
        type: Number,
        optional: false,
        defaultValue: 0
    },
    bgcolor: { // The page background image is expected as transparent and page background color will be this selected value
        type: String,
        optional: false,
        regEx: hexColorRegex,
        defaultValue: '#252525'
    },
    bgimage: { // Transparent background and high resolution image
        type: String,
        optional: true
    },
    visfactor: { // This is a limit value under that peripherals do not seem on page and they are not functional. On runtime, users can display peripherals as functional while zooming in. 100 means components will be visible on page at page zoom level 100%. Set 0 to show always.
        type: Number,
        optional: false,
        defaultValue: 100
    },
    scalefactor: { // Set the peripheral icons scaling, how much big
        type: Number,
        optional: false,
        defaultValue: 100
    },
    showlabels: { // Display peripheral name labels with icons for more explanatory peripheral display
        type: Boolean,
        optional: false,
        defaultValue: true
    },
    visible: { // The page is visible on user interfaces or it is hidden
        type: Boolean,
        optional: false,
        defaultValue: true
    },
    cmdbuttons: {
        type: CommandButtonSchema
    },
    menubuttons: {
        type: MenuButtonSchema
    },
    labels: {
        type: LabelSchema
    },
    detectors: {
        type: DetectorSchema
    },
    chimes: {
        type: ChimeSchema
    },
    videos: {
        type: VideoSchema
    }
});

const SceneSchema = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    bgimage: {
        type: String,
        optional: false
    },
    commands: [{
        name: {
            type: String
        },
        address: {
            type: String,
            optional: false,
            defaultValue: '0/0/0',
            regEx: knxGroupRegex
        },
        dpt: {
            type: Number,
            optional: false,
            defaultValue: 0
        },
        value: {
            type: Number,
            optional: false,
            defaultValue: 0
        },
        delay: {
            type: Number,
            optional: false,
            defaultValue: 0
        }
    }]
});

const ProjectSchema = new SimpleSchema({
    name: {
        type: String
    },
    created: {
        type: new Date,
        optional: false,
        defaultValue: Date.now
    },
    updated: {
        type: new Date,
        optional: false,
        defaultValue: Date.now
    },
    devices: {
        type: DeviceSchema
    },
    pages: {
        type: PageSchema
    },
    scenes: {
        type: SceneSchema
    }
});

const DeviceSchema = new SimpleSchema({
    model: {
        type: String,
        optional: false,
        defaultValue: 'Origin-S'
        allowedValues: ['Origin-S', 'Origin-L', 'Origin-XL', 'ZKS10']
    },
    mac: {
        type: String,
        optional: false,
        regEx: macRegex
    },
    version: {
        type: String,
        optional: false
    },
    usecloud: {
        type: String,
        optional: false,
        defaultValue: 'Cloud',
        allowedValues: ['Cloud', 'Local']
    },
    cloudserveraddress: {
        type: String,
        optional: false
    },
    cloudserverport: {
        type: String,
        optional: false
    },
    update: {
        type: String,
        optional: false,
        defaultValue: 'Automatic',
        allowedValues: ['Automatic', 'Manual']
    },
    lastupdated: {
        type: new Date,
        optional: false,
        defaultValue: Date.now
    },
    netsettings: {
        hostconfig: {
            type: String,
            optional: false,
            defaultValue: 'DHCP',
            allowedValues: ['DHCP', 'Static']
        },
        ipaddress: {
            type: String,
            regEx: SimpleSchema.RegEx.IP
        },
        subnetmask: {
            type: String,
            regEx: SimpleSchema.RegEx.IP
        },
        gateway: {
            type: String,
            regEx: SimpleSchema.RegEx.IP
        }
    },
    knxphy: {
        type: String,
        optional: false,
        defaultValue: '15/15/255',
        regEx: knxPhyRegex
    },
    onboardio: {
        scantime: {
            type: Number,
            optional: false,
            defaultValue: 100
        },
        inputs: [{
            address: {
                type: String,
                optional: false,
                defaultValue: '0/0/0',
                regEx: knxGroupRegex
            },
            type: {
                type: String,
                optional: false,
                defaultValue: 'Persistent',
                allowedValues: ['Toggle', 'Persistent']
            },
            condition: {
                type: String,
                optional: false,
                defaultValue: 'Normal',
                allowedValues: ['Normal', 'Inverted']
            }
        }],
        outputs: [{
            addresses: [{
                type: String,
                optional: false,
                defaultValue: '0/0/0',
                regEx: knxGroupRegex
            }],
            fbaddress: {
                type: String,
                optional: false,
                defaultValue: '0/0/0',
                regEx: knxGroupRegex
            }
        }]
    }
});

