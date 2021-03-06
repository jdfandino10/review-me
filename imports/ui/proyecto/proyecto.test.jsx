/* eslint-disable no-undef,
 no-unused-vars, no-debugger */
debugger;

import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Proyecto from './proyecto.jsx';
import {Projects} from '../../api/projects.js';
import {Meteor} from 'meteor/meteor';



if(Meteor.isClient)
{

    // muy bien esta solucion para simular que ya esta logueado el usuario
    Meteor.userId = function() {
        return '1213213';
    };

    Meteor.user = function() {
        return {
            'services': {
                'github': {
                    'username': 'Llamatest'
                }
            }
        };
    };

    Factory.define('project', Projects, {});

    describe('Projects', function () {

        beforeEach(function () {
            console.log(Meteor.user());
            // este const user para que lo usan?
            const user = {
                'services': {
                    'github': {
                        'username': 'Llamatest'
                    }
                }
            }
            // Meteor.call('createNewUser', user);
            // Meteor.users.insert(user)
            // console.log(Meteor.users.find({}).fetch());
        });


        // buen test para verificar que se haya renderizado el proyecto
        it('Should Render correctly', function () {
            const testProject = Factory.build('project', {
                'url' : 'https://github.com/Llamatech/review-me',
                'description' : '',
                'collaborator' : '',
                'id' : 83160698,
                'name' : 'review-me',
                'owner' : 'Llamatech',
                'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                'webpage' : null,
                'repo' : {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'fork' : false,
                    'watchers' : 0,
                    'forks' : 8,
                    'stars' : 0,
                    'language' : 'JavaScript',
                    'issues' : 3,
                },
                'parent_repo' : '',
                'comments' : [],
                'ratings' : [ 0, [] ],
                'user' : 'andfoy'
            });

            const result  = shallow(<Proyecto id={testProject._id} proyecto={testProject} /> );
            chai.assert(result.hasClass('proyecto'));
          // chai.assert.equal(true, true, "Test");
        });

        // depronto hacer un test para verificar que proyModal se renderiza bien
    });
}

// los archivos tests estan a la mitad del proyecto, lo cual puede llegar a ser confuso. Depronto seria bueno dejarlos en una carpeta testing aparte