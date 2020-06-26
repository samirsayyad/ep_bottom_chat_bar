var eejs = require("ep_etherpad-lite/node/eejs");

exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_chatdate/templates/styles.html", {}, module);
  return cb();
};