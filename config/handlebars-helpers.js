module.exports = {
    ifCond: function(v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },

    formatDate: function(date) {
        return new Date(date).toLocaleDateString();
    },

    formatDateTime: function(date) {
        return new Date(date).toLocaleString();
    },

    eq: function(v1, v2) {
        return v1 === v2;
    },

    ne: function(v1, v2) {
        return v1 !== v2;
    },

    lt: function(v1, v2) {
        return v1 < v2;
    },

    gt: function(v1, v2) {
        return v1 > v2;
    },

    lte: function(v1, v2) {
        return v1 <= v2;
    },

    gte: function(v1, v2) {
        return v1 >= v2;
    },

    and: function() {
        return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
    },

    or: function() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
};