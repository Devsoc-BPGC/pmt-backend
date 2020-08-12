import * as Permissions from '../../database/entity/Permission';
import { Users } from '../../database/entity/User';

export interface Permission {
   user_id: number;
   user?: Users;
   instance_id: number;
   add: Permissions.PermissionStatus;
   view: Permissions.PermissionStatus;
   edit: Permissions.PermissionStatus;
   delete: Permissions.PermissionStatus;
   add_member: Permissions.PermissionStatus;
   remove_member: Permissions.PermissionStatus;
   permission_type: Permissions.PermissionType;
   role: Permissions.Role;
}
