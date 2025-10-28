import {
  Roles,
  Permissions,
  PermissionType,
  RoleType,
} from "../enums/role.enum";

//ek object jisme keys honge type K ke, aur unki value honi chahiye type V ki.”
export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  OWNER: [
    Permissions.CREATE_WORKSPACE,
    Permissions.EDIT_WORKSPACE,
    Permissions.DELETE_WORKSPACE,
    Permissions.MANAGE_WORKSPACE_SETTINGS,

    Permissions.ADD_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,
    Permissions.REMOVE_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.VIEW_ONLY,
  ],
  ADMIN: [
    Permissions.ADD_MEMBER,
    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,
    Permissions.MANAGE_WORKSPACE_SETTINGS,
    Permissions.VIEW_ONLY,
  ],
  MEMBER: [
    Permissions.VIEW_ONLY,
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
  ],
};

// Record version me bas RoleType auto-update ho jaata hai 😎
// TypeScript bolega: “Ab GUEST bhi chahiye RolePermissions me.”

// Manual version me tujhe khud jaake type me GUEST: PermissionType[]; likhna padega.
// Matlab ek extra jagah maintain karna.

// 🧠 For large systems (10+ roles), Record maintenance easy banata hai. 


// export const RolePermissions: {
//   OWNER: PermissionType[];
//   ADMIN: PermissionType[];
//   MEMBER: PermissionType[];
// } = {
//   OWNER: [
//     Permissions.CREATE_WORKSPACE,
//     Permissions.EDIT_WORKSPACE,
//     Permissions.DELETE_WORKSPACE,
//     Permissions.MANAGE_WORKSPACE_SETTINGS,

//     Permissions.ADD_MEMBER,
//     Permissions.CHANGE_MEMBER_ROLE,
//     Permissions.REMOVE_MEMBER,

//     Permissions.CREATE_PROJECT,
//     Permissions.EDIT_PROJECT,
//     Permissions.DELETE_PROJECT,

//     Permissions.CREATE_TASK,
//     Permissions.EDIT_TASK,
//     Permissions.DELETE_TASK,

//     Permissions.VIEW_ONLY,
//   ],
//   ADMIN: [
//     Permissions.ADD_MEMBER,
//     Permissions.CREATE_PROJECT,
//     Permissions.EDIT_PROJECT,
//     Permissions.DELETE_PROJECT,
//     Permissions.CREATE_TASK,
//     Permissions.EDIT_TASK,
//     Permissions.DELETE_TASK,
//     Permissions.MANAGE_WORKSPACE_SETTINGS,
//     Permissions.VIEW_ONLY,
//   ],
//   MEMBER: [
//     Permissions.VIEW_ONLY,
//     Permissions.CREATE_TASK,
//     Permissions.EDIT_TASK,
//   ],
// };
