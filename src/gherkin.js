'use strict';

function extract(string, startWith) {
  startWith = startWith + ' ';

  if (string.indexOf(startWith) !== 0) {
    console.error('Expected', string, 'to start with', startWith);
    throw new Error('Expected "' + string + '" to start with ' + startWith);
  }

  return string.substr(startWith.length).trim();
}

function parser(gherkin) {
  var index = 0;
  var sections = gherkin.split('\n').reduce(function(result, line) {
    line = line.trim();

    if (line === '')
      index++;
    else if (!result[index])
        result[index] = [ line ];
    else
      result[index].push(line);

    return result;
  }, []);


  var firstLine = sections[0][0];

  var feature = {
    name: extract(firstLine, 'Feature:'),
    description: sections[0].slice(1).join('\n'),
  };

  feature.scenarios = sections.slice(1).map(function(section) {
    var scenario = {
      name: extract(section[0], 'Scenario:')
    };

    var lastStep;
    scenario.steps = section.slice(1).map(function(line) {
      var space = line.indexOf(' ');
      if (space === -1) {
        console.error('Unable to parse step', line);
        throw new Error('Unable to parse step ' + line);
      }

      var firstWord = line.substr(0, space);
      var stepType = firstWord === 'And' ? lastStep : firstWord;
      lastStep = stepType;

      return {
        type: stepType,
        text: extract(line, firstWord),
      };
    });

    return scenario;
  });

  return feature;
}

exports.parse = parser;
