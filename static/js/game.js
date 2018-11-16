// based on http://www.lessmilk.com/tutorial/2d-platformer-phaser

var score = 0;
var scoreText;
var mainState = {
    preload: function () {

        wall = $('#wall').attr('src')
        player = $('#player').attr('src')
        coin = $('#coin').attr('src')
        teleport = $('#teleport').attr('src')
        question = $('#question').attr('src')
        grass = $('#grass').attr('src')
        tree = $('#tree').attr('src')

        game.load.image('wall', wall);
        game.load.image('player', player);
        game.load.image('coin', coin);
        game.load.image('teleport', teleport);
        game.load.image('question', question);
        game.load.image('grass', grass);
        game.load.image('tree', tree);
    },

    create: function () {
        scoreText = game.add.text(16, 16, 'score:' + score, {fontSize: '32px', fill: '#000'});
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 5000, 5000);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 200, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 500,
            jumpStrength: 900,
            gravity: 1000
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.questions = game.add.group();
        this.grasses = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!                                            x',
            '!           o                                x',
            '!       o       o                    o       x',
            '!ppp                                         x',
            '! o        pp          q          o          x',
            '!                     pppp           ppp     x',
            '!   ppppp                                    x',
            '!           q                                x',
            '!          pppp                  o           x',
            '!                      q       ppppp         x',
            '!                    pppp                    x',
            '!                                            x',
            '! o               q                          x',
            '!               pppp                         x',
            '!                                    pppp    x',
            '!    ppp                    q                x',
            '!                          ppp               x',
            '!                    q                       x',
            '!            ppppppppppp                     x',
            '!                                            x',
            '!                                     o      x',
            '!        ppppp         o       o   pppp      x',
            '!                                            x',
            '!                                            x',
            'pppppppppppppppppppppppppppppppppppppppppppppp'
        ];

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] === '!') {
                    var teleport = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'teleport');
                    this.teleports.add(teleport);
                } else if (level[i][j] === 'q') {
                    var question = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'question');
                    this.questions.add(question);
                } else if (level[i][j] === 'p') {
                    var grass = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'grass');
                    this.grasses.add(grass);
                    grass.body.immovable = true;
                }

            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        })
        ;
        this.player.behaviors.set('collide-on-grass', Phaser.Behavior.CollisionHandler, {
            targets: this.grasses
        })
        ;

        this.player.behaviors.set('collide-on-teleport', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.teleports,
            collideCallback: this.transfer
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
        this.player.behaviors.set('collect-question', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.questions,
            collideCallback: this.getQuestion
        });
    },
    getQuestion: function (player, question) {
        question.kill();
        var questionaires = ["demographics", "employment_status", "organisational_culture", "open_ended"];
        var rand = Math.floor(Math.random() * 4);
        window.open(questionaires[rand], '_blank');
        score += 5;
        scoreText.text = 'Score: ' + score;

    },


    takeCoin: function (player, coin) {
        score += 1;
        scoreText.text = 'Score: ' + score;
        coin.kill();
    },

    transfer: function () {
        game.state.start('tree');
    },


};
var treeState = {
    preload: function () {
        wall = $('#wall').attr('src')
        player = $('#player').attr('src')
        coin = $('#coin').attr('src')
        teleport = $('#teleport').attr('src')
        question = $('#question').attr('src')
        tree = $('#tree').attr('src')
        tree1 = $('#tree1').attr('src')
        tree2 = $('#tree2').attr('src')

        game.load.image('player', player);
        game.load.image('wall', wall);
        game.load.image('coin', coin);
        game.load.image('teleport', teleport);
        game.load.image('question', question);
        game.load.image('tree', tree);
        game.load.image('tree1', tree1);
        game.load.image('tree2', tree2);
    },

    create: function () {
        scoreText = game.add.text(16, 16, 'score:' + score, {fontSize: '32px', fill: '#000'});
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 5000, 5000);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 300, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 500,
            jumpStrength: 900,
            gravity: 1000
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.doors = game.add.group();
        this.trees = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxx',
            '!               x',
            '!               x',
            '!         t     x',
            '!               x',
            '!               x',
            '!               x',
            'xxxxxxxxxxxxxxxxx'
        ];

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] === '!') {
                    var teleport = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'teleport');
                    this.teleports.add(teleport);
                } else if (level[i][j] === '*') {
                    var door = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'door');
                    this.doors.add(door);
                } else if (level[i][j] === 't') {

                    if (score < 8) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree');
                    if (score > 7 && score <= 15) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree1');
                    if (score > 15) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree2');

                    behaviorPlugin.enable(tree);
                    tree.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
                        targets: this.walls
                    });
                    tree.behaviors.set('tree', Phaser.Behavior.Platformer, {
                        velocity: 0,
                        jumpStrength: 0,
                        gravity: 1000000
                    });
                    this.trees.add(tree);
                }
            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        });

        this.player.behaviors.set('collide-on-teleport', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.teleports,
            collideCallback: this.transfer
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
    },

    takeCoin: function (player, coin) {
        score += 1;
        scoreText.text = 'Score: ' + score;
        coin.kill();
    },

    transfer: function () {
        game.state.start('main');
    }
};

var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS),
    behaviorPlugin;
game.state.add('main', mainState);
game.state.add('tree', treeState);
game.state.start('main');
