export const adminMenu = [
    { //hệ thống người dùng
        name: 'menu.admin.user', 
        menus: [
            {
                name: 'menu.admin.manage-admin',link: '/system/user-admin'
            },
            {
                name: 'menu.admin.manage-staff',link: '/system/user-staff'

            },
            {
                name: 'menu.admin.manage-user',link: '/system/user-user'

            },
        ]
    },
    { //hệ thống category
        name: 'menu.admin.manage-category',
        menus:[
           {
            name: 'menu.admin.manage-category',link: '/system/manage-category',
           }
        ]
        
    },
    { //hệ thống product
        name: 'menu.admin.manage-product',link: '/system/manage-product'
    },
    { //hệ thống blog
        name: 'menu.admin.manage-blog',link: '/system/manage-blog'
    },
];

export const staffMenu = [
    {
        name: 'menu.staff.order', link:'/staff/order',
    },
];