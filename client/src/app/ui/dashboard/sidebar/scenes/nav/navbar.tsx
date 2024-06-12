import React from 'react';
import { Box, Link, Typography, useTheme } from "@mui/material";
import FlexBetween from '../../../../../ui/component/FlexBetween';
import PixIcon from "@mui/icons-material/Pix"; 
import { MdClose } from 'react-icons/md'; // เพิ่ม import MdClose จาก react-icons/md

type Props = {
    onClose: () => void; // เพิ่ม props สำหรับการปิด Modal
}

const NavbarT = ({ onClose }: Props) => { // เพิ่มพารามิเตอร์ onClose ใน NavbarT
    const { palette } = useTheme();
    const selected = "dashboard"; // กำหนดค่าให้กับตัวแปร selected
    return (
        <FlexBetween
            mb="0.25rem"
            p="0.5rem 0rem"
            color={palette.grey[300]}
        >
            {/* Left side */}
            <FlexBetween gap="0.75rem">
                <PixIcon sx={{ fontSize: "28px" }} />
                <Typography variant='h4' fontSize="16px">
                    Finanseer
                </Typography>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="0.75rem">
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        style={{
                            color: selected === "dashboard" ? "inherit" : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        dashboard
                    </Link>
                </Box>
                <Box sx={{ cursor: "pointer", color: palette.error.main }} onClick={onClose}> {/* เพิ่มสีแดงให้กับปุ่ม X */}
                    <MdClose />
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default NavbarT;
