import * as shell from 'shelljs';

shell.cp('-R', 'backend/server.crt', 'build/backend/server.crt');
shell.cp('-R', 'backend/server.key', 'build/backend/server.key');
shell.cp('-R', 'backend/users.json', 'build/backend/users.json');
