// Controller just for the homepage

exports.renderHome = (req, res) => {
  // I’m passing the session user so the header can show Sign In / Sign Out
  res.render('index', {
    title: 'MyStyle Planner',
    user: req.session.user || null
  });
};


//ends